sbapp.controller('TeamController', [
  '$scope',
  'ProjectService',
  '$timeout',
  '$q',
  '$log',
  TeamController
]);

function TeamController($scope, ProjectService,$timeout, $q, $log ) {
  var vm = this;

  //Temp user data to build search bar
  vm.users = [
    {
      createdBy: '575118f30a121d4c1fabca18',
      owner: '575118f30a121d4c1fabca18',
      username: 'user1',
      email: 'email@example.com',
      image: 'images/stacky500p.png',
      bio: 'The domestic cat[1][2] (Latin: Felis catus) or the feral cat[2][4] (Latin: Felis silvestris catus) is a small, ' +
      'typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there ' +
      'is no need to distinguish them from other felids and felines.[6] Cats are often valued by humans for companionship and ' +
      'for their ability to hunt vermin. There are more than 70 cat breeds; different associations proclaim different numbers ' +
      'according to their standards.',
      model: '575118d43cc5068431eaffd9',
      createdAt: '2016-06-03T05:43:15.808Z',
      updatedAt: '2016-06-03T06:59:18.556Z',
      id: '575118f30a121d4c1fabca18'
    },
    {
      createdBy: '575118f30a121d4c1fabca18',
      owner: '575118f30a121d4c1fabca18',
      username: 'user2',
      email: 'useremail@email.com',
      image: 'images/stacky500p.png',
      bio: 'The domestic cat[1][2] (Latin: Felis catus) or the feral cat[2][4] (Latin: Felis silvestris catus) is a small, ' +
      'typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there ' +
      'is no need to distinguish them from other felids and felines.[6] Cats are often valued by humans for companionship and ' +
      'for their ability to hunt vermin. There are more than 70 cat breeds; different associations proclaim different numbers ' +
      'according to their standards.',
      model: '575118d43cc5068431eaffd9',
      createdAt: '2016-06-03T05:43:15.808Z',
      updatedAt: '2016-06-03T06:59:18.556Z',
      id: '575118f30a121d4c1fabca18'
    },
    {
      createdBy: '575118f30a121d4c1fabca18',
      owner: '575118f30a121d4c1fabca18',
      username: 'user3',
      email: 'princess@mycat.de',
      image: 'images/stacky500p.png',
      bio: 'The domestic cat[1][2] (Latin: Felis catus) or the feral cat[2][4] (Latin: Felis silvestris catus) is a small, ' +
      'typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there ' +
      'is no need to distinguish them from other felids and felines.[6] Cats are often valued by humans for companionship and ' +
      'for their ability to hunt vermin. There are more than 70 cat breeds; different associations proclaim different numbers ' +
      'according to their standards.',
      model: '575118d43cc5068431eaffd9',
      createdAt: '2016-06-03T05:43:15.808Z',
      updatedAt: '2016-06-03T06:59:18.556Z',
      id: '575118f30a121d4c1fabca18'
    }
  ];

  //SEARCH BAR
  var pendingSearch, cancelSearch = angular.noop;
  var cachedQuery, lastSearch;
  vm.allContacts = loadContacts();
  vm.contacts = [vm.allContacts[0]];
  vm.asyncContacts = [];
  vm.filterSelected = true;
  vm.querySearch = querySearch;
  vm.delayedQuerySearch = delayedQuerySearch;

  //Search for contacts; use a random delay to simulate a remote call
  function querySearch (criteria) {
    cachedQuery = cachedQuery || criteria;
    return cachedQuery ? vm.allContacts.filter(createFilterFor(cachedQuery)) : [];
  }

  // Async search for contacts
  //Also debounce the queries; since the md-contact-chips does not support this
  function delayedQuerySearch(criteria) {
    cachedQuery = criteria;
    if ( !pendingSearch || !debounceSearch() )  {
      cancelSearch();
      return pendingSearch = $q(function(resolve, reject) {
        // Simulate async search... (after debouncing)
        cancelSearch = reject;
        $timeout(function() {
          resolve( vm.querySearch() );
          refreshDebounce();
        }, Math.random() * 500, true)
      });
    }
    return pendingSearch;
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

  //Create filter function for a query string
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(contact) {
      return (contact._lowername.indexOf(lowercaseQuery) != -1);;
    };
  }

  function loadContacts() {
    for (user in vm.users){
      var contact = user;
    }
    return contact;
  }
}
