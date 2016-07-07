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
sbapp.controller('AuthController', [
  'AUTH_EVENTS',
  '$state',
  '$scope',
  '$rootScope',
  'AuthService',
  'SessionService',
  AuthController
]);

function AuthController(AUTH_EVENTS, $state, $scope, $rootScope, AuthService, SessionService) {
  var vm = this;

  /* CALLABLE MEMBERS */
  vm.authenticate = authenticate;
  vm.register = register;
  vm.reg = {};
  vm.login = {
    user: '',
    password: ''
  };


  /* FUNCTIONS */

  function authenticate(email, password) {
    AuthService.authenticate(email, password)
      .then(
        function (user) {
          vm.login.error = '';
          console.log('authenticate(): logged in');
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          SessionService.create(null, user.username, 'admin');
          $scope.setCurrentUser(user);
          // redirect
          if ($state.current.name == 'account.login') {
            $state.go('home.projects');
          } else {
            $state.reload();
          }

        },
        function () {
          // reset register button
          vm.loginForm.$submitted = false;
          vm.login.error = 'User and password combination is incorrect';
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        }
      );
  }

  function register(username, email, password, password2) {
    // reset all errors
    for (var att in vm.userForm.$error) { // loop failed validator keys
      if (vm.userForm.$error.hasOwnProperty(att)) {
        errs = vm.userForm.$error[att]; // get errors for this key
        for (i = 0; i < errs.length; i++) { // loop failed inputs
          vm.userForm[errs[i].$name].$setValidity(att, true);
        }
      }
    }

    if (password != password2) {
      vm.userForm.password2.$setValidity('mismatch', false);
    } else {
      AuthService.register(username, email, password)
        .then(
          function (res) {
            $state.go('account.login');
          },
          function (res) {
            // parse server errors
            var fields = res.data.invalidAttributes;
            for (item in res.data.invalidAttributes) {
              for (i = 0; i < fields[item].length; i++) {
                error = fields[item][i].message;
                vm.userForm[item].$setValidity(error, false);
              }
            }
            // reset register button
            vm.userForm.$submitted = false;
          }
        );
    }
  }

}
