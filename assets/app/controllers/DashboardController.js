sbapp.controller('DashboardController', [
  '$stateParams',
  '$scope',
  'ProjectService',
  DashboardController
]);

function DashboardController($stateParams, $scope, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.widgets = [];
  vm.loading = false;
  vm.currentDashboard = $stateParams.dashboard;


  /* ACTIONS */

  $scope.currentProject && ($scope.currentProject.id != $stateParams.project) && $scope.setCurrentProject(null);
  loadWidgets();


  /* FUNCTIONS */

  function loadWidgets() {
    vm.loading = true;

    ProjectService.project.get({id: $stateParams.project, populate: 'dashboards'},
      function (project) {
        $scope.setCurrentProject(project);
        var dash = $stateParams.dashboard || project.dashboards[0].id;
        ProjectService.dashboard.get({id: dash, populate: 'widgets'},
          function (dashboard) {
            vm.widgets = dashboard.widgets;
            vm.loading = false;
          },
          function (error) {
            console.log('Dashboard error:', err);
            vm.loading = false;
          }
        );
      },
      function (error) {
        console.log('Project error:', error);
        vm.loading = false;
      });

  }

}

