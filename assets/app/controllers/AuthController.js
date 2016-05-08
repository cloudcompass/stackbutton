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
    user: 'admin@example.com',
    password: 'admin1234',
    error: ''
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
          vm.login.error = 'User and password combination is incorrect';
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        }
      );
  }

  function register(username, email, password, passwordVerify) {
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
