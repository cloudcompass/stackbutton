sbapp.controller('RepositoryController', [
  '$scope',
  'RepositoryService',
  'ProjectService',
  RepositoryController
]);

function RepositoryController($scope, RepositoryService, ProjectService) {
  var vm = this;

  vm.loadCommits = loadCommits;
  vm.repoName = null;
  vm.commits = [];

  vm.repository = [{repository: 'sheaphillips / stackbutton', type: 'private'}];

  vm.contributors = [
    {
      name: 'tiffanytangt',
      amount: '57',
      level: 'whatshot'
    },
    {
      name: 'Foxfrie',
      amount: '33',
      level: ''
    },
    {
      name: 'pcridge',
      amount: '21',
      level: ''
    },
    {
      name: 'sheaphillips',
      amount: '5',
      level: ''
    },
    {
      name: 'swcurren',
      amount: '5',
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
  loadName($scope.$parent.$parent.widget.id);

  function loadName(widgetId) {
    ProjectService.widget.get({widgetid: widgetId, populate: 'modules'},
      function (widget) {
        vm.repoName = widget.modules[0].config.repoFullName;
      },
      function (err) {
        console.log("error:", err);
      }
    );
  }
  function loadCommits(widgetId) {
    RepositoryService.getCommits.query({widget: widgetId},
      function (commits) {
        // console.log("retrieved commits:", commits);
        vm.commits = commits;
      },
      function (err) {
        console.log("error:", err);
      }
    );
  }

}
