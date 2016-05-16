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
  'ProjectService',
  MainController
]);

function MainController(navService, $mdSidenav, $mdBottomSheet, $q, $state, $scope, $mdToast, AuthService, SessionService, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.menuItems = [];
  vm.selectItem = selectItem;
  vm.toggleItemsList = toggleItemsList;
  vm.showSimpleToast = showSimpleToast;
  vm.toggleRightSidebar = toggleRightSidebar;
  vm.logOut = logOut;
  vm.loadProjects = loadProjects;
  vm.projectList = [];
  vm.selectProject = selectProject;

  /* ACTIONS */

  navService
    .loadAllItems()
    .then(function (menuItems) {
      vm.menuItems = [].concat(menuItems);
    });

  /* FUNCTIONS */
  function selectProject(project) {
    $scope.setCurrentProject(project);
    $state.go('home.dashboard', {}, {reload: 'home.dashboard'});
  }

  function loadProjects() {
    return ProjectService.project.query({owner: $scope.currentUser.id},
      function (projects) {
        vm.projectList = projects;
      })
  }

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
