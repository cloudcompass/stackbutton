sbapp.controller('ProfileController', [
  '$scope',
  '$state',
  'ProjectService',
  ProfileController
]);

function ProfileController($scope, $state, ProjectService) {
  var vm = this;

  /* CALLABLE MEMBERS */

  vm.getUserInfo = getUserInfo;
  vm.updateUser = updateUser;

  vm.loading = false;
  vm.user = {
    id: $scope.currentUser.id,
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    bio: ''
  };

  /* ACTIONS */
  getUserInfo();

  /* FUNCTIONS */


  function getUserInfo() {
    vm.loading = true;
    ProjectService.user.get({id: vm.user.id},
      function (user) {
        //success callback
        vm.user.email = user.email;
        vm.user.username = user.username;
        vm.user.first_name = user.first_name;
        vm.user.last_name = user.last_name;
        vm.user.bio = user.bio;
        vm.loading = false;
      },
      function (error) {
        //error callback
        console.log('user error:', error);
        vm.loading = false;
      });
  }


//UPDATE PROJECT DESCRIPTION
  function updateUser(user) {
    //Call update functionality from ProjectService.
    ProjectService.user.update(
      //Data to insert
      user,
      function (user) {
        //success callback
        $state.reload();
      },
      function (error) {
        //error callback
        console.log("Update error:", error);
      }
    );
  }


}

