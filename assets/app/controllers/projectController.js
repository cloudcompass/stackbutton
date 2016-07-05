/**

Copyright 2016, Cloud Compass, Inc.

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
sbapp.controller('ProjectController', [
  '$scope',
  'ProjectService',
  ProjectController
]);

function ProjectController($scope, ProjectService) {
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

