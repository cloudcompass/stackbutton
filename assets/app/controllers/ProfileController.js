/**

Copyright 2016, Cloud Compass, Inc.

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

