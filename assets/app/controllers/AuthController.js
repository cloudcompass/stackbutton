sbapp.controller('AuthController', [
  'AUTH_EVENTS',
  '$state',
  '$scope',
  '$rootScope',
  'AuthService',
  AuthController
]);

function AuthController(AUTH_EVENTS, $state, $scope, $rootScope, AuthService) {
  var vm = this;

  vm.login = {
    user: 'admin@example.com',
    password: 'admin1234',
    error: ''
  };

  vm.reg = {
    user: '',
    email: '',
    password: '',
    passwordVerify: '',
    error: ''
  };

  vm.authenticate = function (email, password) {
    AuthService.authenticate(email, password)
      .then(
        function (user) {
          vm.login.error = '';
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          console.log('authenticate(): logged in');
          $scope.setCurrentUser(user);
        },
        function () {
          vm.login.error = 'User and password combination is incorrect';
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        }
      );
  };

  vm.register = function (username, email, password, passwordVerify) {
    if (password != passwordVerify) {
      vm.reg.error = 'Passwords do not match'
    } else {
      AuthService.register(username, email, password)
        .then(
          function (res) {
            $state.go('account.login');
          },
          function (res) {
            vm.reg.error = '';
            for (item in res.data.invalidAttributes) {
              vm.reg.error += res.data.invalidAttributes[item][0].message + '\r\n';
            }
          }
        );
    }
  }

}
