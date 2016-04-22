sbapp.controller('AuthController', [
  AuthController
]);

function AuthController(AuthService) {
  var vm = this;

  vm.login = {
    user: 'admin@stackbutton.com',
    password: 'bi$on1234',
    error: ''
  };

  vm.reg = {
    user: '',
    email: '',
    password: '',
    passwordVerify: '',
    error: ''
  };
  vm.authenticate = AuthService.authenticate;
  vm.register = AuthService.register;

}
