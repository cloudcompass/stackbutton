sbapp.controller('CreateController', [
  '$state',
  '$scope',
  'ProjectService',
  CreateController
]);

function CreateController($state, $scope, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.error = null;
  vm.addProject = addProject;


  /* FUNCTIONS */

  function addProject(name, description) {
    if ($scope.currentUser == null) {
      console.log('addProject(): null user. Aborting.');
    } else {
      var newProj = {
        name: name,
        description: description
      };
      ProjectService.project.save(newProj,
        function (project, headers) {
          //success callback
          console.log('addProject() success:', project);
          $scope.setCurrentProject(project.id);
          $state.go('home.addtool');
        },
        function (resp) {
          //error callback
          console.log('addProject() error:', resp);
          //TODO add error handling feedback
        }
      );
    }
  }

} // CreateController end
