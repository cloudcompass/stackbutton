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
      scope: $scope,
      preserveScope: true,
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
      '     <md-button class="md-warn md-raised" ng-disabled="submitted" ng-click="delete(\'' + service.id + '\')">' +
      '       <md-progress-linear ng-show="submitted" class="md-warn"></md-progress-linear>' +
      '       <span ng-hide="submitted">Delete</span>' +
      '     </md-button>' +
      '     <md-button class="md-raised md-primary" ng-click="cancelDialog()" ng-disabled="submitted">Cancel</md-button>' +
      '   </span>' +
      '</div>',
      controller: function DialogController($scope, $mdDialog) {
        $scope.delete = function (id) {
          $scope.submitted = true;
          ProjectService.service.remove({id: id},
            function (response) {
              //success callback
              $mdDialog.hide();
            },
            function (error) {
              //stay here it didn't work
              $scope.submitted = false;
              console.log("delete error:", error);
            });
        };
        $scope.cancelDialog = function () {
          $mdDialog.cancel();
        }
      }
    }).then(function () {
      // redirect
      $state.reload();
    });
  }

}
