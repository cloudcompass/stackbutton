sbapp.controller('AuthController', [
  '$resource',
  AuthController
]);

function AuthController($resource) {
  var vm = this;

  var Auth = $resource('/auth/local',
    {}, {
      auth: {method:'POST'}
    });

  vm.user = '';
  vm.password = '';
  vm.authenticate = authenticate;

  function authenticate(usr, pwd) {
    var credentials = {
      "identifier": usr,
      "password": pwd
    };
    var newAuth = new Auth(credentials);

    newAuth.$auth().then(authSuccess, authError);
  }

  function authSuccess(response) {
    console.log(response);
  }

  function authError(response) {
    vm.data = response.data || "Request Failed";
    vm.status = response.status;
    console.log(response.data);

  }


}
