/* Top-level controller -- all other scopes inherit from this one */
sbapp.controller('ApplicationController', [
  '$scope',
  'USER_ROLES',
  'AuthService',
  ApplicationController
]);

function ApplicationController($scope, USER_ROLES, AuthService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };
}
