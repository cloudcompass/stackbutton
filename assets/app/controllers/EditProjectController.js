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
      '<div layout="column" layout-align="center center" layout-padding style="max-width: 350px;">' +
      '   <span style="text-align:center;">Are you sure you want to permanently DELETE' +
      '   <h3 align="center">' + project.name + '</h3>' +
      '   This action cannot be undone! Please type the name of the project to confirm.</span>' +
      '   <md-input-container>' +
      '     <label>Project Name</label>' +
      '     <input type="text" ng-model="confirmBox" required>' +
      '   </md-input-container>' +
      '   <span layout="row" layout-xs="column" layout-align="center center">' +
      '     <md-button class="md-warn md-raised" ng-disabled="submitted || confirmBox!=\'' + project.name + '\'" ng-click="delete(\'' + project.id + '\')">' +
      '       <md-progress-linear ng-show="submitted" class="md-warn"></md-progress-linear>' +
      '       <span ng-hide="submitted">DELETE PROJECT</span>' +
      '     </md-button>' +
      '     <md-button class="md-raised md-primary" ng-click="cancelDialog()" ng-disabled="submitted">Cancel</md-button>' +
      '   </span>' +
      '</div>',
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
    }).then(function () {
      $state.go('home.projects');
    }).finally(function () {
      // clean form & redirect
      $scope.confirmBox = null;
      $scope.submitted = false;
    });
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
