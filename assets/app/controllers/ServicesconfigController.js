sbapp.controller('ServicesconfigController', [
  '$stateParams',
  '$scope',
  'ProjectService',
  ServicesconfigController
]);

function ServicesconfigController($stateParams, $scope, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.services = [];
  vm.loading = false;
  vm.removeService = removeService;


  /* ACTIONS */

  $scope.currentProject && ($scope.currentProject.id != $stateParams.projectId) && $scope.setCurrentProject(null);
  loadServices();


  /* FUNCTIONS */

  function loadServices() {
    vm.loading = true;

    ProjectService.project.get({id: $stateParams.projectId, populate: ['dashboards', 'services']},
      function (project) {
        $scope.setCurrentProject(project);
        vm.services = project.services;
        vm.loading = false;
      },
      function (error) {
        console.log('Project error:', error);
        vm.loading = false;
      });
  }

  function removeService(service) {
    console.log("TODO: delete this service", service);
  }
}
