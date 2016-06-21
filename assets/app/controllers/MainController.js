sbapp.controller('MainController', [
  'navService',
  '$mdSidenav',
  '$mdDialog',
  '$state',
  '$scope',
  'ProjectService',
  MainController
]);

function MainController(navService, $mdSidenav, $mdDialog, $state, $scope, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.menuItems = [];
  vm.showActivities = false;
  vm.loadProjects = loadProjects;
  vm.selectProject = selectProject;
  vm.toggleActivityDrawer = toggleActivityDrawer;
  vm.toggleLeftNav = toggleLeftNav;
  vm.addDashboard = addDashboard;
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

  function addDashboard() {
    $mdDialog.show({
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '' +
      '<div layout="column" layout-padding layout-align="center center" style="max-width: 350px;">' +
      '   <h1 class="md-title" align="center">Add a dashboard</h1>' +
      '   <md-input-container>' +
      '     <input type="text" ng-model="dashname" required placeholder="Enter dashboard name">' +
      '   </md-input-container>' +
      '   <span layout="row" layout-xs="column" layout-align="center center">' +
      '     <md-button class="md-warn md-raised" ng-disabled="dashname.length==0" ng-click="add(dashname)">' +
      '       Create' +
      '     </md-button>' +
      '     <md-button class="md-raised md-primary" ng-click="cancelDialog()">Cancel</md-button>' +
      '   </span>' +
      '</div>',
      controller: function DialogController($scope, $mdDialog) {
        $scope.add = function (name) {
          $mdDialog.hide(name);
        };
        $scope.cancelDialog = function () {
          $mdDialog.cancel();
        }
      }
    }).then(
      function (name) {
        var newdashboard = {
          name: name,
          project: $scope.currentProject.id,
          private: false
        };
        ProjectService.dashboard.save(newdashboard,
          function (dashboard) {
            //success callback
            // refresh
            $state.reload();
          },
          function (error) {
            //stay here it didn't work
            console.log("dashboard error:", error);
          });
      });
  }

} // MainController end
