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
sbapp.controller('ModuleAddController', [
  '$scope',
  '$state',
  '$stateParams',
  'ToolService',
  'ProjectService',
  ModuleAddController
]);

function ModuleAddController($scope, $state, $stateParams, ToolService, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.tools = [];
  vm.modtypes = [];
  vm.services = [];
  vm.repos = [];
  vm.module = {
    type: null,
    config: null,
    service: null,
    project: $stateParams.project
  };
  vm.modtypes = ToolService.modules;
  vm.addModule = addModule;
  vm.back = back;
  vm.next = next;
  vm.configureModule = configureModule;
  vm.loadRepos = loadRepos;
  vm.selectService = selectService;
  vm.filterService = filterService;
  vm.loadServices = loadServices;

  //Used for page back/next and div displays on addATool.html
  vm.currentPage = 1;
  vm.pageCount = 3;
  vm.loading = false;
  vm.submitted = false;


  /* ACTIONS */


  $scope.currentProject && ($scope.currentProject.id != $stateParams.project) && $scope.setCurrentProject(null);
  ProjectService.project.get({id: $stateParams.project, populate: 'dashboards'}, function (project) {
    $scope.setCurrentProject(project);
  });
  // Populate vm.modtypes
  loadServices();
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

  function loadServices() {
    vm.loading = true;
    ProjectService.service.query(
      function (services) {
        vm.services = services;
        vm.loading = false;
      },
      function (error) {
        console.log('Service error:', error);
        vm.loading = false;
      });
  }

  function filterService(service, index, array) {
    for (var i = 0; i < vm.tools.length; i++) {
      if (vm.tools[i].name = service.platform) {
        var tool = vm.tools[i];
        return tool.modules.indexOf(vm.module.type) >= 0;
      }
    }
    return false;
  }

  function selectService(service) {
    vm.module.service = service.id;
    vm.loadRepos(service.id);
    next();
  }

  function loadRepos(serviceId) {
    vm.loading = true;
    vm.repos = [];
    ToolService.loadServiceRepos.query({service: serviceId},
      function (repos) {
        vm.repos = repos;
        vm.loading = false;
      },
      function (err) {
        console.log("error:", err);
        vm.loading = false;
      }
    );
  }

  // data = object to pull properties from
  // properties = optional array of property names to extract (default: *)
  function configureModule(data) {
    if (!vm.module.config || vm.module.config == undefined || vm.module.config == null) {
      vm.module.config = [];

    }

    console.log("adding ", data, vm.module);
    vm.module.config = vm.module.config.concat(data);

    console.log("...to module ", vm.module);
  }

  function addModule(newModule) {
    vm.submitted = true;
    var defaultWidgets = {
      repo: 'commits',
      issues: 'issues'
    };

    if ($scope.currentProject == null) {
      console.log('addModule(): null project. Aborting.');
    } else {
      ProjectService.module.save(newModule,
        //success callback
        function (module) {
          // console.log('addModule() success:', module);
          var currState = $state.current;
          $scope.goBack().then(function () {
            if ($state.current == currState) $state.go('home.modules', {project: $stateParams.project});
          });
        },
        //error callback
        function (err) {
          console.log('addModule() error:', err);
          //TODO add error handling feedback
        }
      );
    }
  }


}
