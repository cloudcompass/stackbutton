sbapp.controller('TeamController', [
  '$scope',
  '$stateParams',
  'ProjectService',
  '$filter',
  '$state',
  '$q',
  TeamController
]);

function TeamController($scope, $stateParams, ProjectService, $filter, $state, $q) {
  var vm = this;
  var pendingSearch, cancelSearch = angular.noop;
  var cachedQuery, lastSearch;

  /* CALLABLE MEMBERS */

  vm.asyncContacts = [];
  vm.filterSelected = true;
  vm.loading = false;
  vm.delayedQuerySearch = delayedQuerySearch;
  vm.addToTeam = addToTeam;
  vm.removeFromTeam = removeFromTeam;


  /* ACTIONS */

  $scope.setCurrentProject(null);
  loadContributors();


  /* FUNCTIONS */

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

  function removeFromTeam(user) {
    vm.loading = true;
    ProjectService.team.delete({}, {project: $scope.currentProject.id, user: user.id},
      function (resp) {
        $state.reload();
        vm.loading = false;

      },
      function (error) {
        console.log('removeFromTeam()', error);
        vm.loading = false;

      });
  }

  function loadContributors() {
    vm.loading = true;
    ProjectService.project.get({id: $stateParams.projectId, populate: ['dashboards', 'contributors']},
      function (project) {
        $scope.setCurrentProject(project);
        vm.loading = false;
      },
      function (error) {
        console.log('Project error:', error);
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

}
