sbapp
  .factory('authHttpResponseInterceptor', ['$q', '$location', authFactory])
  .config(['$httpProvider', function ($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
  }]);

function authFactory($q, $location) {
  return {
    response: function (response) {
      if (response.status === 401 || response.status === 403) {
        console.log("Response " + response.status);
      }
      return response || $q.when(response);
    },
    responseError: function (rejection) {
      if (rejection.status === 401 || rejection.status === 403) {
        console.log("Response Error " + rejection.status, rejection);
        $location.path('/login').search('returnTo', $location.path());
      }
      return $q.reject(rejection);
    }
  }
}

