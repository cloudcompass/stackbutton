sbapp.controller('RepositoryController', [
  '$scope',
  'RepositoryService',
  RepositoryController
]);

function RepositoryController($scope, RepositoryService) {
  var vm = this;

  vm.loadCommits = loadCommits;
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

  console.log($scope.$parent.$parent.widget);
  loadCommits($scope.$parent.$parent.widget.id);

  function loadCommits(widgetId) {
    RepositoryService.getCommits.query({widget: widgetId},
      function (commits) {
        console.log("retrieved commits:", commits);
        vm.commits = commits;
      },
      function (err) {
        console.log("error:", err);
      }
    );
  }

  // RepositoryService
  //   .loadAllItems()
  //   .then(function (commits) {
  //     vm.commits = [].concat(commits);
  //   });
}
