sbapp.controller('projectController', [
  'ProjectService', +
  '$mdDialog',
  projectController
]);

function projectController(ProjectService, $mdDialog) {
  var vm = this;
  
  vm.showDialog = showDialog;

  function showDialog(){
    $mdDialog.show({
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '<create-project></create-project>'
    });
  }


  vm.details = [];
  
  
  ProjectService
    .loadAllItems()
    .then(function (items) {
      vm.details = [].concat(items);
    });
}

