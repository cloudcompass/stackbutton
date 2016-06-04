sbapp.controller('MainController', [
  'navService',
  '$mdSidenav',
  '$mdBottomSheet',
  '$q',
  '$state',
  '$scope',
  '$mdToast',
  '$mdMedia',
  'AuthService',
  'SessionService',
  'ProjectService',
  MainController
]);

function MainController(navService, $mdSidenav, $mdBottomSheet, $q, $state, $scope, $mdToast, $mdMedia, AuthService, SessionService, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.menuItems = [];
  vm.selectItem = selectItem;
  vm.toggleItemsList = toggleItemsList;
  vm.showSimpleToast = showSimpleToast;
  vm.toggleRightSidebar = toggleRightSidebar;
  vm.loadProjects = loadProjects;
  vm.projectList = [];
  vm.selectProject = selectProject;
  vm.showActivities = $mdMedia('gt-xs') ? true : false;

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
    vm.showActivities = !vm.showActivities;
    // vm.hideMobileClass = vm.showActivities ? 'hide-xs' : '';
    // console.log(vm.hideMobileClass);
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

} // MainController end
