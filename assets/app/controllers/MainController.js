sbapp.controller('MainController', [
  'navService',
  '$mdSidenav',
  '$state',
  '$scope',
  '$mdToast',
  'ProjectService',
  MainController
]);

function MainController(navService, $mdSidenav, $state, $scope, $mdToast, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.menuItems = [];
  vm.showActivities = false;
  vm.loadProjects = loadProjects;
  vm.selectProject = selectProject;
  vm.toggleActivityDrawer = toggleActivityDrawer;
  vm.toggleLeftNav = toggleLeftNav;
  $scope.projects = [];
  
  /* ACTIONS */

  $scope.currentUser && loadProjects();
  navService.loadAllItems()
    .then(function (menuItems) {
      vm.menuItems = [].concat(menuItems);
    });

  /* FUNCTIONS */
  function selectProject(project) {
    $scope.setCurrentProject(project);
    $state.go('home.dashboard', {}, {reload: 'home.dashboard'});
  }

  function loadProjects() {
    return ProjectService.project.query({populate: 'dashboards'},
      function (projects) {
        $scope.projects = projects;
      })
  }

  function toggleActivityDrawer() {
    vm.showActivities = !vm.showActivities;
    $mdSidenav('activitydrawer').toggle();
  }

  function toggleLeftNav() {
    $mdSidenav('leftnav').toggle();
  }

} // MainController end
