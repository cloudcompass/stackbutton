/* Top-level controller -- all other scopes inherit from this one */
sbapp.controller('ApplicationController', [
  '$state',
  '$scope',
  'USER_ROLES',
  'AUTH_EVENTS',
  '$mdDialog',
  ApplicationController
]);

function ApplicationController($state, $scope, USER_ROLES, AUTH_EVENTS, $mdDialog) {
  $scope.userRoles = USER_ROLES;
  $scope.currentUser = null;
  $scope.currentProject = null;
  $scope.currentDashboard = null;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
    console.log('current user:', user);
  };
  $scope.setCurrentProject = function (project) {
    $scope.currentProject = project;
    console.log('current project:', project);

  };
  $scope.setCurrentDashboard = function (dashboard) {
    $scope.currentDashboard = dashboard;
    console.log('current dashboard:', dashboard);

  };

  function authDialog(template) {
    console.log('authDialog(): dialog triggered');
    $mdDialog.show({
      escapeToClose: false, // set to false in production
      scope: $scope,
      preserveScope: true,
      template: '<md-dialog aria-label="Popup">' +
      '  <md-dialog-content>' +
      '     <span ng-controller="AuthController as vm" ng-include="\'app/views/' + template + '\'">' +
      '  </md-dialog-content>' +
      '</md-dialog>',
      controller: function DialogController($scope, $mdDialog, AUTH_EVENTS, USER_ROLES) {
        function closeDialog() {
          $mdDialog.hide();
        }

        /* RESOLVE DIALOG CASES */

        // clicked public link
        $scope.$on('$stateChangeStart', function (event, next) {
          var authorizedRoles = next.data.authorizedRoles;
          if (authorizedRoles.indexOf(USER_ROLES.all) !== -1) {
            console.log("authDialog(): requested public state");
            closeDialog();
          }
        });

        // logged in
        $scope.$on(AUTH_EVENTS.loginSuccess, function (event) {
          console.log('authDialog(): ', event.name);
          closeDialog();
        });
      }
    }).then(function () {
      console.log('authDialog(): dialog resolved');
    });
  };

  // AUTH EVENT LISTENERS

  $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
    console.log('event fired: ', event.name);
    // show dialog if event fired from a non-login page
    if ($state.current.name != 'account.login') {
      authDialog('partials/login.html');
    }
  });

  // TODO
  // $scope.$on(AUTH_EVENTS.notAuthorized, function(event, message) {
  //   console.log('event: ', event.name);
  //   authDialog('???');
  // });

}
