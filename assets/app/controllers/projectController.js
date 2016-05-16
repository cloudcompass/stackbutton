sbapp.controller('ProjectController', [
  '$state',
  '$scope',
  'ProjectService',
  '$mdDialog',
  ProjectController
]);

function ProjectController($state, $scope, ProjectService, $mdDialog) {
  var vm = this;

  vm.setCurrentProject = $scope.setCurrentProject;

  vm.showDeleteDialog = function (project) {
    console.log("Delete Function Called");
    $mdDialog.show({
      clickOutsideToClose: true,
      escapeToClose: true,
      scope: $scope,
      preserveScope: true,
      template: '' +
      '<md-card style="max-width: 350px;">' +
      '<div>' +
      '<p class="md-headline">Would you like to permanently DELETE ' + project.name + '?</p>' +
      '</div>' +
      '<div>' +
      '<p class="md-headline">Please type the name of the project to confirm deletion.</p>' +
      '<md-input-container>' +
      '<label>Project Name</label>' +
      '<input type="text" ng-model="confirmBox' + project.id + '" required>' +
      '</md-input-container>' +
      '</div>' +
      '<md-button class="md-primary" ng-if="confirmBox' + project.id + '==\'' + project.name + '\'" ng-click="confirm(' + project.id + ')">DELETE PROJECT</md-button>' +
      '<md-button class="md-warn" ui-sref="home.projects" ng-click="cancelDialog()">Cancel</md-button>' +
      '</md-card>',
      controller: function DialogController($scope, $mdDialog) {
        $scope.confirm = function (id) {
          projectResource = ProjectService.project.remove({projid: id});
          console.log("deleted", projectResource);
          $mdDialog.hide();

        };
        $scope.cancelDialog = function () {
          $mdDialog.cancel();
          // clear text input:
          eval('$scope.confirmBox' + project.id + '=null');
        }
      }
    }).then(
      // dialog resolved handler
      function () {
        $state.reload();
      },
      // dialog cancelled handler
      function () {
        console.log('dialog cancelled');
      });
  };

  vm.projects = $scope.currentUser ? ProjectService.project.query({owner: $scope.currentUser.id}) : [];
  $scope.setCurrentProject(null);

}

