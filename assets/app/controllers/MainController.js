sbapp.controller('MainController', [
  'navService',
  '$mdSidenav',
  '$mdBottomSheet',
  '$q',
  '$state',
  '$mdToast',
  'SessionService',
  MainController
]);

function MainController(navService, $mdSidenav, $mdBottomSheet, $q, $state, $mdToast, SessionService) {
  var vm = this;
  
  vm.menuItems = [];
  vm.selectItem = selectItem;
  vm.toggleItemsList = toggleItemsList;
  vm.title = $state.current.data.title;
  vm.showSimpleToast = showSimpleToast;
  vm.toggleRightSidebar = toggleRightSidebar;
  vm.logOut = logOut;

  navService
    .loadAllItems()
    .then(function (menuItems) {
      vm.menuItems = [].concat(menuItems);
    });

  function toggleRightSidebar() {
    $mdSidenav('right').toggle();
  }

  function toggleItemsList() {
    var pending = $mdBottomSheet.hide() || $q.when(true);
    pending.then(function () {
      $mdSidenav('left').toggle();
    });
  }

  function selectItem(item) {
    vm.title = item.name;
    vm.toggleItemsList();
    vm.showSimpleToast(vm.title);
  }

  function showSimpleToast(title) {
    $mdToast.show(
      $mdToast.simple()
        .content(title)
        .hideDelay(2000)
        .position('bottom right')
    );
  }

  function logOut() {
    SessionService.destroy();
    $state.reload();
    console.log("MainController.logout(): destroyed session");
  }

} // MainController end
