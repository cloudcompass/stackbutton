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
sbapp.controller('ToolController', [
  '$scope',
  'ToolService',
  'ProjectService',
  ToolController
]);

function ToolController($scope, ToolService, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.addService = addService;
  vm.addModule = addModule;
  vm.tools = {};
  vm.currentModule = {
    type: null,
    config: {},
    service: null
  };
  vm.modules = ToolService.modules;
  vm.repos = [];
  vm.back = back;
  vm.next = next;
  vm.selectTool = selectTool;
  vm.configureModule = configureModule;
  vm.templatePath = '';
  vm.loadRepos = loadRepos;
  vm.selectService = selectService;
  vm.loadServices = loadServices;
  vm.currentServiceId = null;
  vm.currentPlatform = null;

  //Used for page back/next and div displays on addATool.html
  vm.currentPage = 1;
  vm.pageCount = 3;


  /* ACTIONS */

  // Populate vm.tools
  ToolService.loadTools().then(function (tools) {
    for (i = 0; i < tools.length; i++) {
      for (j = 0; j < tools[i].modules.length; j++) {
        // create new key if undefined
        if (typeof vm.tools[tools[i].modules[j]] == 'undefined') {
          vm.tools[tools[i].modules[j]] = [];
        }
        // fill arrays: vm.tools.repo, vm.tools.wiki, etc.
        vm.tools[tools[i].modules[j]].push(tools[i]);
      }
    }
    //console.log('tools loaded:',vm.tools);
  });


  /* FUNCTIONS */

  function back() {
    vm.currentPage--;
  }

  function next() {
    vm.currentPage++;
  }

  // data = object to pull properties from
  // properties = optional array of property names to extract (default: *)
  function configureModule(data, properties) {
    if (typeof properties == 'undefined') {
      vm.currentModule.config = data;
    } else {
      for (var i = 0; i < properties.length; i++) {
        vm.currentModule.config[properties[i]] = data[properties[i]];
      }
    }
    console.log(vm.currentModule);
  }

  function selectTool(moduleType, tool) {
    vm.templatePath = 'app/views/setup/' + tool.name + '.html';
    vm.currentPlatform = tool.name;
    vm.currentModule.type = moduleType;
    vm.currentPage = 1;
    loadServices();
  }

  function selectService(service) {
    vm.currentServiceId = service.id;
    vm.currentModule.service = service.id;
    vm.loadRepos(service.id);
  }

  function loadServices() {
    ProjectService.service.query({
        project: $scope.currentProject.id,
        platform: vm.currentPlatform,
        owner: $scope.currentUser.id
      },
      function (services) {
        vm.services = services;
      }
    );
  }

  function addService(platform, token) {
    if ($scope.currentProject == null) {
      console.log('addService(): null project. Aborting.');
    } else {
      var newService = {
        platform: platform,
        token: token,
        project: $scope.currentProject
      };
      ProjectService.service.save(newService,
        //success callback
        function (service) {
          //TODO modify this to not display tokens locally
          console.log('addService() success:', service);
          loadServices();
        },
        //error callback
        function (err) {
          console.log('addService() error:', err);
          vm.currentServiceId = null;
          //TODO add error handling feedback
        }
      );
    }
  }

  function addModule(module) {
    if ($scope.currentProject == null) {
      console.log('addModule(): null project. Aborting.');
    } else {
      var newModule = ProjectService.module.save(module,
        //success callback
        function (module) {
          console.log('addModule() success:', module);
          vm.currentPage = 0;
          defaultWidgets = {
            repo: 'commits',
            issues: 'issues'
          };

          /////
          // TODO to be removed. This is to add a first widget to the default dashboard"
          var dashRes = ProjectService.dashboard.query({
              project: $scope.currentProject.id,
              name: 'default',
              populate: 'widgets'
            },
            function (dashboard) {
              console.log('found dashboard', dashRes);
              dashRes[0].widgets.push(
                {
                  template: defaultWidgets[module.type],
                  modules: [module.id]
                }
              );
              dashRes[0].$save().then(function (res) {
                  console.log('saved widget:', res);
                },
                function (err) {
                  console.log('could not save widget:', err);
                });
            },
            function (err) {
              console.log('error:', err);
            }
          );
          /////

        },
        //error callback
        function (err) {
          console.log('addModule() error:', err);
          //TODO add error handling feedback
        }
      );
    }
  }

  function loadRepos(serviceId) {
    //TODO something something
    console.log('hello?');
    ToolService.loadServiceRepos.query({service: serviceId},
      function (repos) {
        console.log("retrieved repos:", repos);
        vm.repos = repos;
      },
      function (err) {
        console.log("error:", err);
      }
    );
  }
}
