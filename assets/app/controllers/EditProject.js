sbapp.controller('EditProject', [
  '$scope',
  '$state',
  'ProjectService',
  EditProject
]);

function EditProject($scope, $state, ProjectService) {
  var vm = this;
  vm.updateProject = updateProject;

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
