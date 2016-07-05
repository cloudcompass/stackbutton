/**

Copyright 2016, Cloud Compass, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
sbapp.controller('TeamController', [
  '$scope',
  '$stateParams',
  'ProjectService',
  '$filter',
  '$state',
  '$q',
  '$mdDialog',
  TeamController
]);

function TeamController($scope, $stateParams, ProjectService, $filter, $state, $q, $mdDialog) {
  var vm = this;
  var pendingSearch, cancelSearch = angular.noop;
  var cachedQuery, lastSearch;

  /* CALLABLE MEMBERS */

  vm.asyncContacts = [];
  vm.contributors = [];
  vm.filterSelected = true;
  vm.loading = false;
  vm.delayedQuerySearch = delayedQuerySearch;
  vm.addToTeam = addToTeam;
  vm.showDeleteDialog = showDeleteDialog;



  /* ACTIONS */

  $scope.currentProject && ($scope.currentProject.id != $stateParams.project) && $scope.setCurrentProject(null);
  loadContributors();


  /* FUNCTIONS */

  function loadContributors() {
    vm.loading = true;
    ProjectService.project.get({id: $stateParams.project, populate: ['dashboards', 'contributors']},
      function (project) {
        $scope.setCurrentProject(project);
        vm.contributors = project.contributors;
        vm.loading = false;
      },
      function (error) {
        console.log('Project error:', error);
        vm.loading = false;
      });
  }

  function addToTeam(users) {
    // gather promises
    var requests = [];
    angular.forEach(users, function (user, key) {
      this.push(ProjectService.team.save({project: $scope.currentProject.id, user: user.id}).$promise);
    }, requests);

    // send all
    vm.loading = true;
    $q.all(requests).then(
      function (resp) {
      },
      function (error) {
        console.log("addToTeam()", error);
      }
    ).finally(function () {
      $state.reload();
      vm.loading = false;
    });
  }

  // Search for contacts & debounce
  function querySearch(criteria) {
    cachedQuery = cachedQuery || criteria;

    // build list of users to exclude from autocomplete
    var excludeIds = $scope.currentProject.contributors.map(function (c, index) {
      return c.id;
    });
    excludeIds.push($scope.currentUser.id);
    excludeIds.push($scope.currentProject.owner);
    var query = {
      id: {
        "!": excludeIds
      }
    };
    query = angular.toJson(query);

    return ProjectService.user.query({where: query}).$promise.then(function (resp) {
      refreshDebounce();
      return cachedQuery ? $filter('filter')(loadContacts(resp), createFilterFor(cachedQuery)) : [];
    });
  }

  // Async call for contacts
  function delayedQuerySearch(criteria) {
    cachedQuery = criteria;
    if (!pendingSearch || !debounceSearch()) {
      cancelSearch();
      return pendingSearch = $q(function (resolve, reject) {
        cancelSearch = reject;
        resolve(querySearch());
      });
    }
    return pendingSearch;
  }


  // helper function to transform user array into usable format
  function loadContacts(users) {
    // console.log(users);
    return users.map(function (c, index) {
      var contact = {
        id: c.id,
        name: c.username,
        email: c.email,
        image: 'images/stacky500p.png'
      };
      contact.name && ( contact._lowername = contact.name.toLowerCase() );
      return contact;
    });
  }

  // Create case-insensitive filter for a query string
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(contact) {
      return (contact._lowername && contact._lowername.indexOf(lowercaseQuery) != -1);
    };
  }

  function refreshDebounce() {
    lastSearch = 0;
    pendingSearch = null;
    cancelSearch = angular.noop;
  }

  //Debounce if querying faster than 300ms
  function debounceSearch() {
    var now = new Date().getMilliseconds();
    lastSearch = lastSearch || now;
    return ((now - lastSearch) < 300);
  }

  function showDeleteDialog(user) {
    $mdDialog.show({
      scope: $scope,
      preserveScope: true,
      clickOutsideToClose: true,
      escapeToClose: true,
      template: '' +
      '<div layout="column" layout-align="center center" layout-padding style="max-width: 350px;">' +
      '   <div style="text-align:center;">Are you sure you want to remove' +
      '     <span class="md-body-2">' + user.username + '</span> from the project?' +
      '   </div>' +
      '   <span layout="row" layout-xs="column" layout-align="center center">' +
      '     <md-button class="md-warn md-raised" ng-disabled="submitted" ng-click="delete(\'' + user.id + '\')">' +
      '       <md-progress-linear ng-show="submitted" class="md-warn"></md-progress-linear>' +
      '       <span ng-hide="submitted">Delete</span>' +
      '     </md-button>' +
      '     <md-button class="md-raised md-primary" ng-click="cancelDialog()" ng-disabled="submitted">Cancel</md-button>' +
      '   </span>' +
      '</div>',
      controller: function DialogController($scope, $mdDialog) {
        $scope.delete = function (id) {
          $scope.submitted = true;
          ProjectService.team.delete({}, {project: $scope.currentProject.id, user: user.id},
            function (resp) {
              //success callback
              $mdDialog.hide();
            },
            function (error) {
              //stay here it didn't work
              $scope.submitted = false;
              console.log("delete error:", error);
            });
        };
        $scope.cancelDialog = function () {
          $mdDialog.cancel();
        }
      }
    }).then(function () {
      // redirect
      $state.reload();
    });
  }

}
