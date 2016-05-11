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
  vm.tools = {};
  vm.modules = ToolService.modules;
  vm.repos = [];
  vm.back = back;
  vm.next = next;
  vm.selectTool = selectTool;
  vm.templatePath = '';
  vm.loadRepos = loadRepos;
  vm.currentServiceId = null;
  vm.currentPlatform = null;

  //Used for page back/next and div displays on addATool.html
  vm.currentPage = 0;
  vm.pageCount = 0;


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

  function back(){
    vm.currentPage--;
  }

  function next(){
    vm.currentPage++;
  }

  function selectTool(tool) {
    vm.templatePath = 'app/views/setup/' + tool.name + '.html';
    vm.currentPlatform = tool.name;
    vm.currentPage = 1;
    // TODO move owner filter on service objects to backend row-level permissions
    ProjectService.service.query({project: $scope.currentProject, platform: tool.name, owner: $scope.currentUser.id},
      function (services) {
        vm.services = services;
      });
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
          vm.currentServiceId = service.id;
          vm.loadRepos(service.id);
          vm.next();
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

  function loadRepos(serviceId) {
    //TODO something something
    console.log('Not yet implemented. Go get repos for service', serviceId);
    vm.repos = [
      {
        id: 1,
        full_name: 'Repo1'
      },
      {
        id: 2,
        full_name: 'SomeOtherRepo'
      }
    ]
  }
}
