sbapp.controller('ProjectController', [
  'ProjectService',
  '$mdDialog',
  ProjectController
]);

function ProjectController(ProjectService, $mdDialog) {
  var vm = this;

  console.log("projcontrollerloaded");

  vm.showDialog = showDialog;

  function showDialog(){
    $mdDialog.show({
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '<create-project></create-project>'
    });
  }


  vm.details = [];
  
}

