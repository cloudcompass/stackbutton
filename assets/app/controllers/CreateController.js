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

  /* ACTIONS */


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
        function (project) {
          $scope.projects.push(project);
          $state.go('home.dashboard', {project: project.id});
        },
        function (error) {
          //error callback
          console.log('addProject() error:', error);
        }
      );
    }
  }

} // CreateController end
