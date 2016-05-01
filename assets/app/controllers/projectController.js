sbapp.controller('ProjectController', [
  '$scope',
  'ProjectService',
  '$mdDialog',
  ProjectController
]);

function ProjectController($scope, ProjectService, $mdDialog) {
  var vm = this;

  console.log("projcontrollerloaded");

  vm.showDeleteDialog = function(){
    console.log("Delete Function Called");
    $mdDialog.show({
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '<delete-project></delete-project>'
    });
  };

  vm.projects = ProjectService.query({ownerId: $scope.currentUser.id});


  // vm.projects = [
  //   {
  //     name: 'Project 1',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt varius nulla quis ullamcorper.'
  //   },
  //   {
  //     name: 'Project 2',
  //     description: 'Vestibulum lacinia volutpat sapien, et faucibus lectus blandit ac.'
  //   },
  //   {
  //     name: 'Project 3',
  //     description: 'Nunc sollicitudin magna vitae ex porta varius.'
  //   },
  //   {
  //     name: 'Project 4',
  //     description: 'Fusce magna dui, pellentesque tincidunt posuere eu, varius at ligula.'
  //   }
  // ];

}

