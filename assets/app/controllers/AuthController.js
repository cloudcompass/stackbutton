sbapp.controller('AuthController', [
  '$http',
  '$q',
  '$state',
  AuthController
]);

function AuthController($http, $q, $state) {
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
  vm.authenticate = authenticate;
  vm.register = register;

  function authenticate(email, password) {
    var data = {
      "identifier": email,
      "password": password
    };
    $http.post('/auth/local', data, null).then(authSuccess, authError);
  }

  function authSuccess(response) {
    vm.data = response.data;
    vm.status = response.status;
    if (response.status === 401 || response.status === 403) {
      console.log("Response " + response.status);
    }
    $state.go('home.projects');
    return response || $q.when(response);
  }

  function authError(response) {
    vm.data = response.data || "Request Failed";
    vm.status = response.status;

    if (response.status === 401 || response.status === 403) {
      console.log("Response Error " + response.status, response);
      //$location.path('/login').search('returnTo', $location.path());
    }
    vm.error = 'incorrect';
    return $q.reject(response);
  }

  function register(username, email, password, passwordVerify) {
    if (password == passwordVerify) {
      var data = {
        "username": username,
        "email": email,
        "password": password
      };

      $http.post('/user', data, null).then(regSuccess, regError);
    } else {
      var response = 'Passwords do not match';
      console.log(response);
    }
  }

  function regSuccess(response) {
    vm.data = response.data;
    vm.status = response.status;

    console.log("Success " + response.status, response);
    $state.go('login');
    vm.login.user = response.data.username;
    vm.login.password = '';
    return response || $q.when(response);
  }

  function regError(response) {
    vm.data = response.data || "Request Failed";
    vm.status = response.status;

    if (response.status != 200) {
      console.log("Response Error " + response.status, response);
    }

    return $q.reject(response);
  }
}
