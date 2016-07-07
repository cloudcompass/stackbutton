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
sbapp.controller('EditProjectController', [
  '$scope',
  '$state',
  '$stateParams',
  '$mdDialog',
  '$filter',
  'ProjectService',
  EditProjectController
]);

function EditProjectController($scope, $state, $stateParams, $mdDialog, $filter, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.updateProject = updateProject;
  vm.showDeleteDialog = showDeleteDialog;
  vm.name = '';
  vm.description = '';
  vm.loading = false;
  vm.deleting = false;


  /* ACTIONS */

  getProjectInfo();

  /* FUNCTIONS */

  function getProjectInfo() {
    vm.loading = true;
    ProjectService.project.get({id: $stateParams.project},
      function (project) {
        //success callback
        $scope.setCurrentProject(project);
        vm.name = $scope.currentProject.name;
        vm.description = $scope.currentProject.description;
        vm.loading = false;
      },
      function (error) {
        //error callback
        console.log('Project error:', error);
        vm.loading = false;
      });
  }


  //UPDATE PROJECT DESCRIPTION
  function updateProject(newName, newDescription) {
    //Call update functionality from ProjectService.
    ProjectService.project.update(
      //Data to insert
      {
        id: $stateParams.project,
        name: newName,
        description: newDescription
      },
      function (project) {
        //success callbackvar currState = $state.current;
        var currState = $state.current;
        $scope.goBack().then(function () {
          if ($state.current == currState) $state.go('home.projects');
        });
      },
      function (error) {
        //error callback
        console.log("Update error:", error);
      }
    );
  }

  function showDeleteDialog(project) {
    $mdDialog.show({
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '' +
      '<div layout="column" layout-padding layout-align="center center" style="max-width: 350px;">' +
      '   Are you sure you want to permanently DELETE' +
      '   <h3 align="center">' + project.name + '</h3>' +
      '   This action cannot be undone. Please type the name of the project to confirm.</span>' +
      '   <md-input-container>' +
      '     <input type="text" ng-model="confirmBox" required placeholder="Enter project name">' +
      '   </md-input-container>' +
      '   <span layout="row" layout-xs="column" layout-align="center center">' +
      '     <md-button class="md-warn md-raised" ng-disabled="confirmBox!=\'' + project.name + '\'" ng-click="delete()">' +
      '       DELETE PROJECT' +
      '     </md-button>' +
      '     <md-button class="md-raised md-primary" ng-click="cancelDialog()">Cancel</md-button>' +
      '   </span>' +
      '</div>',
      controller: function DialogController($scope, $mdDialog) {
        $scope.delete = function () {
          $mdDialog.hide();
        };
        $scope.cancelDialog = function () {
          $mdDialog.cancel();
        }
      }
    }).then(
      function () {
        vm.deleting = true;
        ProjectService.project.remove({id: $stateParams.project},
          function (response) {
            //success callback

            // remove entry from project selector
            var obj = $filter('filter')($scope.projects, function (proj, index) {
              return proj.id == $stateParams.project;
            })[0];
            var idx = $scope.projects.indexOf(obj);
            $scope.projects.splice(idx, 1);

            // redirect
            $state.go('home.projects');
          },
          function (error) {
            //stay here it didn't work
            vm.deleting = false;
            console.log("delete error:", error);
          });

      });
  }


//Don't touch this guy, hes a nice little fella' and we don't want to hurt him or break this controller by deleting him.
}//You're safe with me little curly bracket.
//Safe and sound.
