sbapp.controller('ProjectController', [
  '$state',
  '$scope',
  'ProjectService',
  '$mdDialog',
  ProjectController
]);

function ProjectController($state, $scope, ProjectService, $mdDialog) {
  var vm = this;

  vm.setCurrentProject = $scope.setCurrentProject;

  vm.projects = $scope.currentUser ? ProjectService.project.query({owner: $scope.currentUser.id}) : [];
  $scope.setCurrentProject(null);

}

