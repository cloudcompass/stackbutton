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
sbapp.controller('ServicesController', [
  '$scope',
  '$state',
  '$mdDialog',
  'ProjectService',
  ServicesController
]);

function ServicesController($scope, $state, $mdDialog, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.services = [];
  vm.loading = false;
  vm.showDeleteDialog = showDeleteDialog;


  /* ACTIONS */

  loadServices();


  /* FUNCTIONS */

  function loadServices() {
    vm.loading = true;

    ProjectService.service.query(
      function (services) {
        vm.services = services;
        vm.loading = false;
      },
      function (error) {
        console.log('Service error:', error);
        vm.loading = false;
      });
  }

  function showDeleteDialog(service) {
    $mdDialog.show({
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '' +
      '<div layout="column" layout-align="center center" layout-padding style="max-width: 350px;">' +
      '   <div style="text-align:center;">Are you sure you want to remove the' +
      '     <span class="md-body-2">' + service.platform + '</span>' +
      '     service to' +
      '     <span class="md-body-2">' + service.name + '</span>?' +
      '   </div>' +
      '   <span layout="row" layout-xs="column" layout-align="center center">' +
      '     <md-button class="md-warn md-raised" ng-click="delete()">Delete</md-button>' +
      '     <md-button class="md-raised md-primary" ng-click="cancelDialog()">Cancel</md-button>' +
      '   </span>' +
      '</div>',
      controller: function DialogController($scope, $mdDialog) {
        $scope.delete = function () {
          $mdDialog.hide(service.id);
        };
        $scope.cancelDialog = function () {
          $mdDialog.cancel();
        }
      }
    }).then(function (servid) {
      vm.loading = true;
      ProjectService.service.remove({id: servid},
        function (response) {
          //success callback
          // redirect
          $state.reload();
        },
        function (error) {
          //stay here it didn't work
          $scope.submitted = false;
          console.log("delete error:", error);
        });
    }).finally(function () {
      vm.loading = false;
    });
  }

}
