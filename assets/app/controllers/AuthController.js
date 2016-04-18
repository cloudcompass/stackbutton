sbapp.controller('AuthController', [
  '$http',
  AuthController
]);

function AuthController($http) {
  var vm = this;

  vm.user = 'admin@stackbutton.com';
  vm.password = 'bi$son1234';
  vm.authenticate = authenticate;

  function authenticate(usr, pwd) {
    var data = {
      "identifier": usr,
      "password": pwd
    };
    $http.post('/auth/local', data, null).then(authSuccess, authError);
  }

  function authSuccess(response) {
    vm.data = response.data;
    vm.status = response.status;
    console.log(response.data);
  }

  function authError(response) {
    vm.data = response.data || "Request Failed";
    vm.status = response.status;
    console.log(response.data);

  }


}
