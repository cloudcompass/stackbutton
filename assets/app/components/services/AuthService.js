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
sbapp.service('SessionService', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
});

sbapp.factory('AuthService', [
  'USER_ROLES',
  'SessionService',
  '$http',
  '$q',
  '$state',
  AuthService]
);

function AuthService(USER_ROLES, SessionService, $http, $q, $state) {
  var authService = {};

  /* CALLABLE MEMBERS */

  authService.authenticate = authenticate;
  authService.isAuthenticated = isAuthenticated;
  authService.isAuthorized = isAuthorized;
  authService.logout = logout;
  authService.register = register;

  return authService;


  /* FUNCTIONS */

  function authenticate(email, password) {
    var data = {
      "identifier": email,
      "password": password
    };
    return $http.post('/auth/local', data, null).then(
      // success callback
      function (response) {
        //console.log('authenticate():', response);
        return response.data || $q.when(response.data);
      },
      // failure callback
      function (error) {
        //console.log('authenticate():', error);
        return $q.reject(error);
      }
    );
  }

  function register(username, email, password) {
    var data = {
      "username": username,
      "email": email,
      "password": password
    };
    return $http.post('/user', data, null).then(
      // success callback
      function (response) {
        console.log('register():', response);
        return response || $q.when(response);
      },
      // failure callback
      function (response) {
        //console.log('register():', error);
        return $q.reject(response);
      }
    );
  }

  function logout() {
    $http.get('/logout').then(
      function (resp) {
        console.log('destroy(): destroyed session');
        $state.reload();
      },
      function (err) {
        console.log('destroy(): error ending session', err);
      });
  }


  /* CHECKING FUNCTIONS */

  function isAuthenticated() {
    // any non-null value returns true
    return !!SessionService.userId;
  }

  function isAuthorized(authorizedRoles) {
    //console.log('isAuthorized(): current session', SessionService);
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    // return true if public page OR if authenticated+authorized
    return (authorizedRoles.indexOf(USER_ROLES.all) !== -1)
      || (authService.isAuthenticated() && authorizedRoles.indexOf(SessionService.userRole) !== -1);
  }
}

