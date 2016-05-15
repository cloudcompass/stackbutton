sbapp.controller('DashboardController', [
  '$scope',
  'ProjectService',
  DashboardController
]);

function DashboardController($scope, ProjectService) {
  var vm = this;
  vm.widgets = [];

  ProjectService.dashboard.query({project: $scope.currentProject.id, populate: 'widgets'},
    function (dashboards, headers) {
      $scope.setCurrentDashboard(dashboards[0]);
      vm.widgets = $scope.currentDashboard.widgets;
    },
    function (err) {
      console.log('error:', err);
    }
  );


}

