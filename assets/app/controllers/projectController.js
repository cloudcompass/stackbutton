sbapp.controller('ProjectController', [
  'ProjectService',
  '$mdDialog',
  ProjectController
]);

function ProjectController(ProjectService, $mdDialog) {
  var vm = this;

  console.log("projcontrollerloaded");

  vm.showDeleteDialog = function(){
    console.log("Delete Function Called");
    $mdDialog.show({
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '<delete-project></delete-project>'
    });
  }


  vm.details = [];

}

