/**

Copyright 2016, Cloud Compass Computing, Inc.

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
  vm.demo = $scope.$parent.$parent.$parent.vm.demo;
  vm.demo && loadSamples();
  vm.demo || loadIssues($scope.$parent.$parent.widget.id);
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

  function loadSamples() {
    vm.repoName = 'repository/name';
    vm.issues = [{
      number: 46,
      body: "An issue",
      labels: [{name: 'label name', color: 'F24F5E'}]
    }];

  }
}
