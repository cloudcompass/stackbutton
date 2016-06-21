sbapp.controller('ModuleController', [
  '$scope',
  '$state',
  '$stateParams',
  '$mdDialog',
  'ProjectService',
  ModuleController
]);

function ModuleController($scope, $state, $stateParams, $mdDialog, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.modules = [];
  vm.loading = false;
  vm.showDeleteDialog = showDeleteDialog;


  /* ACTIONS */

  loadModules();


  /* FUNCTIONS */

  function loadModules() {
    vm.loading = true;

    ProjectService.project.get({id: $stateParams.project, populate: 'dashboards'},
      function (project) {
        $scope.setCurrentProject(project);
      },
      function (error) {
        console.log('Project error:', error);
      });

    ProjectService.module.query({project: $stateParams.project},
      function (modules) {
        vm.modules = modules;
        vm.loading = false;
      },
      function (error) {
        console.log('Modules error:', error);
        vm.loading = false;
      });
  }

  function showDeleteDialog(module) {
    $mdDialog.show({
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '' +
      '<div layout="column" layout-align="center center" layout-padding style="max-width: 350px;">' +
      '   <div style="text-align:center;">Are you sure you want to remove the' +
      '     <span class="md-body-2">' + module.type + '</span>' +
      '     module?' +
      '   </div>' +
      '   <span layout="row" layout-xs="column" layout-align="center center">' +
      '     <md-button class="md-warn md-raised" ng-disabled="submitted" ng-click="delete(\'' + module.id + '\')">' +
      '       <md-progress-linear ng-show="submitted" class="md-warn"></md-progress-linear>' +
      '       <span ng-hide="submitted">Delete</span>' +
      '     </md-button>' +
      '     <md-button class="md-raised md-primary" ng-click="cancelDialog()" ng-disabled="submitted">Cancel</md-button>' +
      '   </span>' +
      '</div>',
      controller: function DialogController($scope, $mdDialog) {
        $scope.delete = function (id) {
          $scope.submitted = true;
          ProjectService.module.remove({id: id},
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
