sbapp.controller('EditProject', [
  '$scope',
  '$state',
  '$mdDialog',
  'ProjectService',
  EditProject
]);

function EditProject($scope, $state, $mdDialog, ProjectService) {
  var vm = this;
  vm.updateProject = updateProject;

  //vm.showDeleteDialog = showDeleteDialog;

  //DELETE PROJECT DIALOG
  vm.showDeleteDialog = function (project) {
    //Grabbing current project to delete
    var currentProject = $scope.currentProject;

    console.log("Delete Function Called");
    $mdDialog.show({
      clickOutsideToClose: true,
      escapeToClose: true,
      scope: $scope,
      preserveScope: true,
      template: '' +
      '<md-card style="max-width: 350px;">' +
        '<div>' +
          '<p class="md-headline">Would you like to permanently DELETE ' + currentProject.name + '?</p>' +
        '</div>' +
        '<div>' +
          '<p class="md-headline">Please type the name of the project to confirm deletion.</p>' +
          '<md-input-container>' +
            '<label>Project Name</label>' +
            '<input type="text" ng-model="confirmBox' + currentProject.id + '" required>' +
          '</md-input-container>' +
        '</div>' +
        '<md-button class="md-primary" ng-if="confirmBox' + currentProject.id + '==\'' + currentProject.name + '\'" ng-click="confirm(' + currentProject.id + ')">DELETE PROJECT</md-button>' +
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
          eval('$scope.confirmBox' + currentProject.id + '=null');
        }
      }
    }).then(
      // dialog resolved handler
      function () {
        //Redundant go code to fix issue with page not reloading properly after project deletion
        $state.go('home.projects');
        $state.reload();
        $state.go('home.projects');
      },
      // dialog cancelled handler
      function () {
        console.log('dialog cancelled');
      });
  };

  //UPDATE PROJECT DESCRIPTION
  function updateProject(newName, newDescription) {
    //Grab id to target PUT to
    var projId = $scope.currentProject.id;

    //Call update functionality from ProjectService.
    ProjectService.project.update(
      //Data to insert
      {
        id: projId,
        name: newName,
        description: newDescription
      },

      //Function called if successful
      function (project) {
        console.log("Update Successful.", project);
        $state.go('home.projects');
      },

      //Function called if failed
      function (resp) {
        console.log("Update Failed!", resp);
      }
    );
  }


//Don't touch this guy, hes a nice little fella' and we don't want to hurt him or break this controller by deleting him.
}//You're safe with me little curly bracket.
//Safe and sound.
