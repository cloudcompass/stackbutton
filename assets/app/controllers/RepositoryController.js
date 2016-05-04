sbapp.controller('RepositoryController', [
  'RepositoryService',
  RepositoryController
]);

function RepositoryController(RepositoryService) {
  var vm = this;
  vm.commits = [];

  vm.repository = [{repository: 'stackbutton', type: 'private'}];

  vm.contributors = [
    {
      name: 'tiffanytangt',
      amount: '40',
      level: 'whatshot'
    },
    {
      name: 'Foxfrie',
      amount: '30',
      level: ''
    },
    {
      name: 'pcridge',
      amount: '13',
      level: ''
    }
  ];

  vm.branches = [
    {
      type: 'star_border',
      name: 'Master',
      current: 'md-title',
      activity: 'Default'
    },
    {
      type: 'timeline',
      name: 'sess-test',
      current: '',
      activity: 'Active'

    },
    {
      type: 'timeline',
      name: 'gh-pages',
      current: '',
      activity: 'Stale'
    }
  ];

  RepositoryService
    .loadAllItems()
    .then(function (commits) {
      vm.commits = [].concat(commits);
    });
}
