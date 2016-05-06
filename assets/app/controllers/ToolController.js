sbapp.controller('ToolController', [
  '$scope',
  'RepositoryService',
  'ProjectService',
  ToolController
]);

function ToolController($scope, RepositoryService, ProjectService) {
  var vm = this;
  vm.back = back;
  vm.next = next;
  vm.select = select;
  vm.templatePath = '';

  //Used for page back/next and div displays on addATool.html
  vm.currentPage = 0;
  vm.pageCount = 0;

  //Using a numeric system to hide and show pages of this setup
  // 0 = Main page
  // 1 = Github setup
  // 2 = other. - Bitbucket setup is not implemented

  function back(){
    vm.currentPage--;
  }

  function next(){
    vm.currentPage++;
  }

  function select(tool) {
    switch (tool) {
      case 'github':
        vm.templatePath = 'app/views/setup/github.html';
        vm.pageCount = 3;
        console.log("github selected");
        break;
      case 'bitbucket':
        vm.templatePath = 'app/views/setup/bitbucket.html';
        vm.pageCount = 2;
        console.log("bitbucket selected");
        break;
    }
    vm.currentPlatform = tool;
    vm.currentPage = 1;
  }

  vm.checkToken = function (gitToken) {
    console.log("checking token", gitToken);
    RepositoryService.github.user.get({access_token: gitToken},
      function (res) {
        vm.gitNickname = res.login;
        console.log('github authorized:', res);
        RepositoryService.github.repos.query({access_token: gitToken},
          function (res) {
            vm.repos = res;
            console.log('github repos:', res);
          },
          function (err) {
            console.log('error:', err);
          }
        )
      },
      function (err) {
        console.log('error:', err);
      }
    );
  };

  vm.addService = function (platform, token) {
    if ($scope.currentProject == null) {
      console.log('addService(): null project. Aborting.');
    } else {
      var newService = {
        platform: platform,
        token: token,
        project: $scope.currentProject.id
      };
      ProjectService.service.save(newService,
        function (service) {
          //success callback
          console.log('addService() success:', service);
          vm.currentService = service;
          vm.next();
        },
        function (resp) {
          //error callback
          console.log('addService() error:', resp);
          vm.currentService = [];
          //TODO add error handling feedback
        }
      );
    }
  };
}
