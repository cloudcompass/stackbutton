sbapp.service('SessionService', function () {
  this.create = function (sessionId, userId) {
    this.id = sessionId;
    this.userId = userId;
    // this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    // this.userRole = null;
  };
});

sbapp.factory('AuthService', [
  '$cookies',
  'SessionService',
  '$http',
  '$state',
  '$q',
  AuthService]
);

function AuthService($cookies, SessionService, $http, $state, $q) {
  var authService = {};
  authService.authenticate = authenticate;
  authService.register = register;
  authService.isAuthenticated = isAuthenticated;
  authService.isAuthorized = isAuthorized;

  /* LOGIN FUNCTIONS */

  function authenticate(email, password) {
    var data = {
      "identifier": email,
      "password": password
    };
    return $http.post('/auth/local', data, null).then(authSuccess, authError);
  }

  function authSuccess(response) {
    console.log("Success ", response);
    $state.go('home.projects');
    SessionService.create($cookies.get('sails.sid'), response.data.username);
    return response.data || $q.when(response.data);
  }

  function authError(response) {
    console.log("Error ", response.status, response);
    return $q.reject(response);
  }

  /* REGISTER FUNCTIONS */

  function register(username, email, password) {
    var data = {
      "username": username,
      "email": email,
      "password": password
    };
    return $http.post('/user', data, null).then(regSuccess, regError);
  }

  function regSuccess(response) {
    console.log("Success ", response.status, response);
    return response || $q.when(response);
  }

  function regError(response) {
    console.log("Error ", response.status, response);
    return $q.reject(response);
  }

  function isAuthenticated() {
    return !!SessionService.userId;
  }

  function isAuthorized(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
    authorizedRoles.indexOf(SessionService.userRole) !== -1);
  }

  return authService;
}

