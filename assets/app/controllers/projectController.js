sbapp.controller('ProjectController', [
  '$state',
  '$scope',
  'ProjectService',
  '$mdDialog',
  ProjectController
]);

function ProjectController($state, $scope, ProjectService, $mdDialog) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.projects = [];
  vm.loading = false;
  vm.setCurrentProject = $scope.setCurrentProject;


  /* ACTIONS */

  // reset project context when loading listing
  $scope.setCurrentProject(null);

  // retrieve projects from server
  getProjects();


  /* FUNCTIONS */

  function getProjects() {
    vm.loading = true;
    $scope.currentUser && ProjectService.project.query({populate: 'dashboards'},
      function (projects) {
        vm.projects = projects;
        vm.loading = false;
      },
      function (error) {
        console.log(error);
        vm.projects = [];
        vm.loading = false;
      });
  }
}

