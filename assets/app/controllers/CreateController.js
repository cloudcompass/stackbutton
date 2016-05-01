sbapp.controller('CreateController', [
  '$state',
  '$scope',
  'ProjectService',
  CreateController
]);

function CreateController($state, $scope, ProjectService) {
  // Expose variables and functions to the view:
  var vm = this;
  vm.error = null;

  vm.addProject = function (name, description) {
    if($scope.currentUser == null){
      console.log('addProject(): null user. Aborting.');
    } else {
      var newProj = {
        name: name,
        description: description,
        ownerId: $scope.currentUser.id
      };
      ProjectService.save(newProj,
        function (project, headers) {
          //success callback
          console.log('addProject() success:', project);
          $state.go('home.projects');
        },
        function (resp) {
          //error callback
          console.log('addProject() error:', resp);
        }
      );
    }
  };

  // vm.register = function (username, email, password, passwordVerify) {
  //   if (password != passwordVerify) {
  //     vm.reg.error = 'Passwords do not match'
  //   } else {
  //     AuthService.register(username, email, password)
  //       .then(
  //         function (res) {
  //           $state.go('login');
  //         },
  //         function (res) {
  //           vm.reg.error = '';
  //           for (item in res.data.invalidAttributes) {
  //             vm.reg.error += res.data.invalidAttributes[item][0].message;
  //           }
  //         }
  //       );
  //   }
  // }

}
