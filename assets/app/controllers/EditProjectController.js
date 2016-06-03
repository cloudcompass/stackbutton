sbapp.controller('EditProjectController', [
  '$scope',
  '$state',
  '$mdDialog',
  'ProjectService',
  EditProjectController
]);

function EditProjectController($scope, $state, $mdDialog, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.updateProject = updateProject;
  vm.showDeleteDialog = showDeleteDialog;

  /* ACTIONS */
  vm.name = $scope.currentProject.name;
  vm.description = $scope.currentProject.description;

  /* FUNCTIONS */

  //DELETE PROJECT DIALOG
  function showDeleteDialog(project) {
    console.log("Delete Function Called");
    $mdDialog.show({
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '' +
      '<md-card style="max-width: 350px;">' +
      '   <p>Are you sure you want to permanently DELETE</p>' +
      '   <h3 align="center">' + project.name + '</h3>' +
      '   <p class="md-warn"> This action cannot be undone!</p>' +
      '   <p>Please type the name of the project to confirm.</p>' +
      '   <md-input-container>' +
      '     <label>Project Name</label>' +
      '     <input type="text" ng-model="confirmBox" required>' +
      '   </md-input-container>' +
      '   <md-button class="md-warn md-raised" ng-disabled="submitted || confirmBox!=\'' + project.name + '\'" ng-click="delete(\'' + project.id + '\')">' +
      '     <md-progress-linear ng-show="submitted" class="md-warn"></md-progress-linear>' +
      '     <span ng-hide="submitted">DELETE PROJECT</span>' +
      '   </md-button>' +
      '   <md-button class="md-raised md-primary" ng-click="cancelDialog()" ng-disabled="submitted">Cancel</md-button>' +
      '</md-card>',
      controller: function DialogController($scope, $mdDialog) {
        $scope.delete = function (id) {
          $scope.submitted = true;
          ProjectService.project.remove({projid: id},
            function (response) {
              //success
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
    }).finally(
      function () {
        // clean form & redirect
        $scope.confirmBox = null;
        $scope.submitted = false;
        $state.go('home.projects');
      }
    );
  }

  //UPDATE PROJECT DESCRIPTION
  function updateProject(newName, newDescription) {
    //Call update functionality from ProjectService.
    ProjectService.project.update(
      //Data to insert
      {
        id: $scope.currentProject.id,
        name: newName,
        description: newDescription
      },

      //Function called if successful
      function (project) {
        //console.log("Update Successful.", project);
        $state.go('home.projects');
      },

      //Function called if failed
      function (error) {
        console.log("Update Failed!", error);
      }
    );
  }


//Don't touch this guy, hes a nice little fella' and we don't want to hurt him or break this controller by deleting him.
}//You're safe with me little curly bracket.
//Safe and sound.
