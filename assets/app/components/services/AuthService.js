sbapp.factory('AuthService', [
  '$scope',
  '$rootScope',
  'AUTH_EVENTS',
  '$http',
  '$state',
  '$q',
  AuthService]
);

function AuthService($scope, $rootScope, AUTH_EVENTS, $http, $state, $q) {
  var authService = {};
  authService.authenticate = authenticate;
  authService.register = register;

  /* LOGIN FUNCTIONS */

  function authenticate(email, password) {
    var data = {
      "identifier": email,
      "password": password
    };
    $http.post('/auth/local', data, null).then(authSuccess, authError);
  }

  function authSuccess(response) {
    if (response.status === 401 || response.status === 403) {
      console.log("Response " + response.status);
    }
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    $scope.setCurrentUser(user);
    $state.go('home.projects');
    //return response || $q.when(response);
  }

  function authError(response) {
    if (response.status === 401 || response.status === 403) {
      console.log("Response Error " + response.status, response);
    }
    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    //return $q.reject(response);
  }

  /* REGISTER FUNCTIONS */

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
    console.log("Success " + response.status, response);
    $state.go('login');
    return response || $q.when(response);
  }

  function regError(response) {
    if (response.status != 200) {
      console.log("Response Error " + response.status, response);
    }
    return $q.reject(response);
  }

  return authService;
}

