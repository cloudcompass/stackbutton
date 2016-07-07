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
sbapp.controller('WidgetAddController', [
  '$scope',
  '$state',
  '$stateParams',
  'ToolService',
  'ProjectService',
  WidgetAddController
]);

function WidgetAddController($scope, $state, $stateParams, ToolService, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.type = null;
  vm.widget = {
    template: null,
    dashboard: null,
    module: null
  };
  vm.services = [];
  vm.modtypes = ToolService.modules;
  vm.addWidget = addWidget;
  vm.back = back;
  vm.next = next;
  vm.selectModule = selectModule;
  vm.selectWidget = selectWidget;
  vm.filterModules = filterModules;

  //Used for page back/next and div displays on addATool.html
  vm.currentPage = 1;
  vm.pageCount = 3;
  vm.loading = false;
  vm.submitted = false;


  /* ACTIONS */

  vm.demo = true;
  $scope.currentProject && ($scope.currentProject.id != $stateParams.project) && $scope.setCurrentProject(null);
  ProjectService.project.get({id: $stateParams.project, populate: 'dashboards'}, function (project) {
    $scope.setCurrentProject(project);
  });
  // Populate vm.modtypes
  loadServices();
  loadModules();
  vm.widget.dashboard = $stateParams.dashboard;


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

  function loadModules() {
    vm.loading = true;

    ProjectService.module.query({project: $stateParams.project},
      function (modules) {
        vm.modules = modules;
        vm.loading = false;
      },
      function (error) {
        console.log('Modules error:', error);
        vm.loading = false;
      });
  }

  function selectModule(module) {
    vm.widget.module = module.id;
  }

  function selectWidget(template) {
    vm.widget.template = template;
  }

  // return only modules that provide the selected widget type
  function filterModules(module, index, array) {
    var widgets;
    switch (module.type) {
      case 'repo':
        widgets = ['commits', 'branches', 'contributors'];
        break;
      case 'issues':
        widgets = ['issues'];
        break;
      case 'wiki':
        widgets = [];
        break;
    }
    return (widgets.indexOf(vm.widget.template) >= 0);
  }

  function addWidget(newWidget) {
    vm.submitted = true;

    if ($scope.currentProject == null) {
      console.log('addModule(): null project. Aborting.');
    } else {
      ProjectService.widget.save(newWidget,
        //success callback
        function (widget) {
          console.log('addWidget() success:', widget);
          // redirect to dashboard
          var currState = $state.current;
          $state.go('home.dashboard', {
            project: $stateParams.project,
            dashboard: $stateParams.dashboard
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
