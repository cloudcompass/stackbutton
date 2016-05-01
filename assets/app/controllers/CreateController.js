sbapp.controller('CreateController', [
  '$scope',
  'ProjectService',
  CreateController
]);

function CreateController($scope, ProjectService) {
  // Expose variables and functions to the view:
  var vm = this;
  vm.error = null;

  console.log('Loaded Create Controller');


  vm.addProject = function (name, description) {
    console.log('Add Project called');
    if($scope.currentUser == null){
      console.log('USER IS NULL');
    }else{
      var newProj = {
        name: name,
        description: description,
        ownerId: $scope.currentUser.id
      };
      console.log('addProject() adding:', newProj);
      ProjectService.save(newProj,
        function (project, headers) {
          //success callback
          console.log('addProject() success:', project);
        },
        function (resp) {
          //error callback
          console.log('addProject() error:', resp);
        }
      );
      // .then(
      //   function (project) { vm.error = ''; },
      //   function (res) {
      //     vm.error = 'Couldn\'t create project';
      //     for (item in res.data.invalidAttributes) {
      //       vm.error += res.data.invalidAttributes[item][0].message + '\r\n';
      //     }
      //   }
      // );
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
