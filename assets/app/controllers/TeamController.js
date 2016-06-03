sbapp.controller('TeamController', [
  '$scope',
  'ProjectService',
  TeamController
]);

function TeamController($scope, ProjectService) {
  var vm = this;

  //Get team members
  vm.contributors = $scope.currentUser ? ProjectService.project.query({populate: 'contributors'}) : [];

  //SEARCH BAR
    //TODO
  //FIND USERS
    //TODO

}
