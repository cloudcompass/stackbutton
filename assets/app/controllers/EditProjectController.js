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


  /* ACTIONS */

  getProjectInfo();

  /* FUNCTIONS */

  function getProjectInfo() {
    vm.loading = true;
    ProjectService.project.get({id: $stateParams.projectId},
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
        id: $stateParams.projectId,
        name: newName,
        description: newDescription
      },
      function (project) {
        //success callback
        $scope.goBack();
      },
      function (error) {
        //error callback
        console.log("Update error:", error);
      }
    );
  }

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
      '   This action cannot be undone. Please type the name of the project to confirm.</span>' +
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
          ProjectService.project.remove({id: id},
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
      // remove entry from project selector
      var obj = $filter('filter')($scope.projects, function (proj, index) {
        return proj.id == $stateParams.projectId;
      })[0];
      var idx = $scope.projects.indexOf(obj);
      $scope.projects.splice(idx, 1);
      // redirect
      $state.go('home.projects');
    }).finally(function () {
      // clean form
      $scope.confirmBox = null;
      $scope.submitted = false;
    });
  }



//Don't touch this guy, hes a nice little fella' and we don't want to hurt him or break this controller by deleting him.
}//You're safe with me little curly bracket.
//Safe and sound.
