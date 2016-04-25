sbapp.controller('CreateController', [
  'AUTH_EVENTS',
  '$state',
  '$scope',
  '$rootScope',
  'ProjectService',
  CreateController
]);

function CreateController(AUTH_EVENTS, $state, $scope, $rootScope, ProjectService) {
  var vm = this;
  vm.error = null;

  // Expose variables and functions to the view:


  vm.addProject = function (name, description, startDate, endDate) {
    if (startDate > endDate) {
      vm.error = "Project start date cannot be later than end date"
    } else {
      ProjectService.addProject(name, description, startDate, endDate, $scope.currentUser.id)
        .then(
          function (project) {
            vm.error = '';
          },
          function (res) {
            vm.error = 'Couldn\'t create project';
            for (item in res.data.invalidAttributes) {
              vm.error += res.data.invalidAttributes[item][0].message + '\r\n';
            }
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
