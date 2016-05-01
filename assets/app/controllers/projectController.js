sbapp.controller('ProjectController', [
  '$scope',
  'ProjectService',
  '$mdDialog',
  ProjectController
]);

function ProjectController($scope, ProjectService, $mdDialog) {
  var vm = this;

  vm.showDeleteDialog = function (project) {
    console.log("Delete Function Called");
    $mdDialog.show({
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '' +
      '<md-card style="max-width: 350px;">' +
      '<div>' +
      '<p class="md-headline">Would you like to permanently DELETE ' + project.name + '?</p>' +
      '</div>' +
      '<div>' +
      '<p class="md-headline">Please type the name of the project to confirm deletion.</p>' +
      '<md-input-container>' +
      '<label>Project Name</label>' +
      '<input type="text" ng-model="confirmBox" required>' +
      '</md-input-container>' +
      '</div>' +
      '<md-button class="md-primary" ng-show="confirmBox">DELETE PROJECT</md-button>' +
      '<md-button class="md-warn" ui-sref="home.projects">Cancel</md-button>' +
      '</md-card>'
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

