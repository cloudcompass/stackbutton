sbapp.controller('DashboardController', [
  '$stateParams',
  '$scope',
  'ProjectService',
  DashboardController
]);

function DashboardController($stateParams, $scope, ProjectService) {
  var vm = this;
  vm.widgets = [];
  console.log($stateParams);

  ProjectService.dashboard.get({id: $stateParams.dashboardId, populate: ['widgets', 'project']},
    function (dashboard, headers) {
      vm.widgets = dashboard.widgets;
      $scope.setCurrentProject(dashboard.project);
      
    },
    function (err) {
      console.log('error:', err);
    }
  );


}

