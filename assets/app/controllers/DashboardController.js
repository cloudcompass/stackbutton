/**

Copyright 2016, Cloud Compass Computing, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
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

