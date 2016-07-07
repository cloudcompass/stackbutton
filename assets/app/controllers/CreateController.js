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
sbapp.controller('CreateController', [
  '$state',
  '$scope',
  'ProjectService',
  CreateController
]);

function CreateController($state, $scope, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.error = null;
  vm.addProject = addProject;

  /* ACTIONS */


  /* FUNCTIONS */

  function addProject(name, description) {
    if ($scope.currentUser == null) {
      console.log('addProject(): null user. Aborting.');
    } else {
      var newProj = {
        name: name,
        description: description
      };
      ProjectService.project.save(newProj,
        function (project) {
          $scope.projects.push(project);
          $state.go('home.dashboard', {project: project.id});
        },
        function (error) {
          //error callback
          console.log('addProject() error:', error);
        }
      );
    }
  }

} // CreateController end
