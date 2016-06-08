sbapp.controller('DashboardController', [
  '$stateParams',
  '$scope',
  'ProjectService',
  DashboardController
]);

function DashboardController($stateParams, $scope, ProjectService) {
  var vm = this;
  vm.widgets = [];
  vm.loading = false;
  console.log($stateParams);
  $scope.setCurrentProject(null);
  loadWidgets();


  function loadWidgets() {
    vm.loading = true;
    ProjectService.dashboard.get({id: $stateParams.dashboardId, populate: ['widgets', 'project']},
      function (dashboard, headers) {
        vm.widgets = dashboard.widgets;
        vm.loading = false;
        ProjectService.project.get({id: dashboard.project.id, populate: ['dashboards']},
          function (project) {
            $scope.setCurrentProject(project);
          });
      },
      function (err) {
        console.log('error:', err);
        vm.loading = false;
      }
    );
  }

}

