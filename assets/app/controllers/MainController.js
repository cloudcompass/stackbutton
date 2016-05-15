sbapp.controller('MainController', [
  'navService',
  '$mdSidenav',
  '$mdBottomSheet',
  '$q',
  '$state',
  '$scope',
  '$mdToast',
  'AuthService',
  'SessionService',
  MainController
]);

function MainController(navService, $mdSidenav, $mdBottomSheet, $q, $state, $scope, $mdToast, AuthService, SessionService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.menuItems = [];
  vm.selectItem = selectItem;
  vm.toggleItemsList = toggleItemsList;
  vm.showSimpleToast = showSimpleToast;
  vm.toggleRightSidebar = toggleRightSidebar;
  vm.logOut = logOut;


  /* ACTIONS */

  navService
    .loadAllItems()
    .then(function (menuItems) {
      vm.menuItems = [].concat(menuItems);
    });


  /* FUNCTIONS */

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
    AuthService.logout();
    SessionService.destroy();
    $scope.setCurrentUser(null);
  }

} // MainController end
