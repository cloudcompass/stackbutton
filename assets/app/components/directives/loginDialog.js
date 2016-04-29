sbapp.directive('loginDialog', ['$mdDialog', 'AUTH_EVENTS', function ($mdDialog, AUTH_EVENTS) {
  return {
    restrict: 'A',
    template: '',
    link: function (scope) {
      var showDialog = function () {
        $mdDialog.show({
          clickOutsideToClose: false,
          template: '<md-dialog>' +
          '  <md-dialog-content>' +
          '     <div ng-controller="AuthController as vm" ng-include="\'app/views/login.html\'">' +
          '  </md-dialog-content>' +
          '</md-dialog>',
          controller: function DialogController($scope, $mdDialog, AuthService) {
            $scope.closeDialog = function () {
              $mdDialog.hide();
            };
            $scope.setCurrentUser = function (user) {
              $scope.currentUser = user;
            };
            $scope.$on(AUTH_EVENTS.loginSuccess, $scope.closeDialog);
            $scope.$on('$stateChangeStart', function (event, next) {
              var authorizedRoles = next.data.authorizedRoles;
              if (AuthService.isAuthorized(authorizedRoles)) {
                $scope.closeDialog();
              }
            });
          }
        });
      };
      scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
      scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
    }
  };
}]);
