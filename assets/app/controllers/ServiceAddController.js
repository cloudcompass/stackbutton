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
