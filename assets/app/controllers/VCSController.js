sbapp.controller('VCSController', [
  '$scope',
  'RepositoryService',
  'ProjectService',
  VCSController
]);

function VCSController($scope, RepositoryService, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

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
  vm.demo = null;

  /* ACTIONS */

  vm.demo = $scope.$parent.$parent.$parent.vm.demo;
  vm.demo && loadSamples();
  vm.demo || loadCommits($scope.$parent.$parent.widget.id);
  vm.demo || loadName($scope.$parent.$parent.widget.id);
  
  /* FUNCTIONS */

  function loadName(widgetId) {
    ProjectService.widget.get({widgetid: widgetId, populate: 'module'},
      function (widget) {
        vm.repoName = widget.module.config.full_name;
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

  function loadSamples() {
    vm.repoName = 'repository/name';
    vm.commits = [{
      author: {avatar_url: 'images/stacky500p.png', login: 'Commit Author'},
      commit: {committer: {date: new Date()}, message: 'Commit message'}
    }];
    vm.issues = [{
      number: 46,
      body: "An issue",
      labels: [{name: 'label name', color: 'F24F5E'}]
    }];

  }

}
