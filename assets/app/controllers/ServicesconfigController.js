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
