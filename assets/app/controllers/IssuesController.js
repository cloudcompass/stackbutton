sbapp.controller('IssuesController', [
  '$sails',
  '$scope',
  'RepositoryService',
  'ProjectService',
  IssuesController
]);

function IssuesController($sails, $scope, RepositoryService, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.loadIssues = loadIssues;
  vm.repoName = null;
  vm.issues = [];


  /* ACTIONS */

  // listen for new events
  $sails.on("event", function (message) {
    if (message.verb == 'created') {
      // console.log(message.data);
      loadIssues($scope.$parent.$parent.widget.id);
    }
  });
  loadIssues($scope.$parent.$parent.widget.id);
  loadName($scope.$parent.$parent.widget.id);


  /* FUNCTIONS */

  function loadName(widgetId) {
    ProjectService.widget.get({widgetid: widgetId, populate: 'modules'},
      function (widget) {
        vm.repoName = widget.modules[0].config.full_name;
      },
      function (err) {
        console.log("error:", err);
      }
    );
  }

  function loadIssues(widgetId) {
    RepositoryService.getIssues.query({widget: widgetId},
      function (issues) {
        // console.log("retrieved issues:", issues);
        vm.issues = issues;
      },
      function (err) {
        console.log("error:", err);
      }
    );
  }

}
