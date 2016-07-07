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
sbapp.controller('ServiceAddController', [
  '$scope',
  '$state',
  'ToolService',
  'ProjectService',
  ServiceAddController
]);

function ServiceAddController($scope, $state, ToolService, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.addService = addService;
  vm.tools = [];
  vm.back = back;
  vm.next = next;
  vm.selectTool = selectTool;
  vm.service = {
    platform: null,
    token: null
  };

  //Used for page back/next and div displays on addATool.html
  vm.currentPage = 1;
  vm.pageCount = 0;

  vm.submitted = false;

  /* ACTIONS */

  // Populate vm.tools
  ToolService.loadTools().then(function (tools) {
    vm.tools = tools;
  });


  /* FUNCTIONS */

  function back() {
    vm.currentPage--;
  }

  function next() {
    vm.currentPage++;
  }

  function selectTool(tool) {
    vm.service.platform = tool.name;
    next();
  }


  function addService(newService) {
    vm.submitted = true;
    if ($scope.currentUser == null) {
      console.log('addService(): null user. Aborting.');
    } else {
      // console.log(newService);
      ProjectService.service.save(newService,
        //success callback
        function (service) {
          vm.submitted = false;
          console.log('addService() success:', service);
          var currState = $state.current;
          $scope.goBack().then(function () {
            if ($state.current == currState) $state.go('home.services');
          });

        },
        //error callback
        function (err) {
          vm.submitted = false;
          console.log('addService() error:', err);
          //TODO add error handling feedback
        }
      );
    }
  }

}
