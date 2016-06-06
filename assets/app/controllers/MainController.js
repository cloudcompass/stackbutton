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
  vm.projectList = [];
  vm.showActivities = false;
  vm.loadProjects = loadProjects;
  vm.selectItem = selectItem;
  vm.selectProject = selectProject;
  vm.showSimpleToast = showSimpleToast;
  vm.toggleActivityDrawer = toggleActivityDrawer;
  vm.toggleLeftNav = toggleLeftNav;

  /* ACTIONS */

  navService
    .loadAllItems()
    .then(function (menuItems) {
      vm.menuItems = [].concat(menuItems);
    });
  loadProjects();

  /* FUNCTIONS */
  function selectProject(project) {
    $scope.setCurrentProject(project);
    $state.go('home.dashboard', {}, {reload: 'home.dashboard'});
  }

  function loadProjects() {
    return ProjectService.project.query({populate: 'dashboards'},
      function (projects) {
        vm.projectList = projects;
      })
  }

  function toggleActivityDrawer() {
    vm.showActivities = !vm.showActivities;
    $mdSidenav('activitydrawer').toggle();
  }

  function toggleLeftNav() {
    $mdSidenav('leftnav').toggle();
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
