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

      name: 'master',
      current: 'dash-widget-font',
      activity: 'Default',
      button: 'md-raised md-primary',
      color: 'github-labels-default',
      active: 'Current'

    },
    {

      name: 'gh-pages',
      current: 'dash-widget-text',
      activity: 'Stale',
      color: 'github-labels-stale',
      ahead: 'Ahead: 2',
      behind: 'Behind: 149'

    },
    {

      name: 'ssh-table',
      current: 'dash-widget-text',
      activity: 'Stale',
      color: 'github-labels-stale',
      ahead: 'Ahead: 0',
      behind: 'Behind: 149'

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
