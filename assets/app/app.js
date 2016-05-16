'use strict';

var sbapp = angular.module('sbapp', [
  'ngResource',
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'ngMaterial',
  'nvd3'
]);

sbapp
// Define application-wide constants
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })

  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
  })


  .config(['USER_ROLES', '$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider',
    function (USER_ROLES, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
      // Define UI states
      $stateProvider
        .state('welcome', {
          url: '/welcome',
          templateUrl: 'app/views/landing.html',
          data: {
            authorizedRoles: [USER_ROLES.all]
          }
        })
        .state('account', {
          url: '',
          controller: 'AuthController',
          controllerAs: 'vm',
          templateUrl: 'app/views/grayback.html',
          abstract: true,
          data: {
            authorizedRoles: [USER_ROLES.all]
          }
        })
        .state('account.login', {
          url: '/login',
          templateUrl: 'app/views/partials/login.html',
          data: {
            authorizedRoles: [USER_ROLES.all]
          }
        })
        .state('account.register', {
          url: '/register',
          controller: 'AuthController',
          controllerAs: 'vm',
          templateUrl: 'app/views/partials/register.html',
          data: {
            authorizedRoles: [USER_ROLES.all]
          }
        })
        .state('home', {
          url: '',
          templateUrl: 'app/views/main.html',
          controller: 'MainController',
          controllerAs: 'vm',
          abstract: true,
          data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home.dashboard', {
          url: '/dashboard',
          controller: 'DashboardController',
          controllerAs: 'vm',
          templateUrl: 'app/views/dashboard.html',
          data: {
            title: 'Dashboard',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home.profile', {
          url: '/profile',
          templateUrl: 'app/views/profile.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          data: {
            title: 'Profile',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home.table', {
          url: '/table',
          controller: 'TableController',
          controllerAs: 'vm',
          templateUrl: 'app/views/table.html',
          data: {
            title: 'Table',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home.projects', {
          url: '/projects',
          templateUrl: 'app/views/projects.html',
          controller: 'ProjectController',
          controllerAs: 'vm',
          data: {
            title: 'Projects',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home.create', {
          url: '/create',
          templateUrl: 'app/views/createproject.html',
          controller: 'CreateController',
          controllerAs: 'vm',
          data: {
            title: 'New Project',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home.delete', {
          url: '/delete',
          templateUrl: 'app/views/deleteproject.html',
          controller: 'MainController',
          controllerAs: 'vm',
          data: {
            title: 'Delete Project',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home.plugin', {
          url: '/plugin',
          templateUrl: 'app/views/pluginConfiguration.html',
          controller: 'MainController',
          controllerAs: 'vm',
          data: {
            title: 'Configure Plugins',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home.addtool', {
          url: '/addtool',
          templateUrl: 'app/views/addATool.html',
          controller: 'ToolController',
          controllerAs: 'vm',
          data: {
            title: 'Add a tool',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home.widgettest', {
          url: '/widgettest',
          templateUrl: 'app/views/widgetstest.html',
          controller: '',
          controllerAs: 'vm',
          data: {
            title: 'TEST',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home.editproject', {
          url: '/editproject',
          templateUrl: 'app/views/editproject.html',
          controller: '',
          controllerAs: 'vm',
          data: {
            title: 'Edit Project',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        .state('home.addwidget', {
          url: '/addwidget',
          templateUrl: 'app/views/addAWidget.html',
          controller: '',
          controllerAs: 'vm',
          data: {
            title: 'Add a Widget',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
      ;

      // Redirect unknown URLs
      $urlRouterProvider.otherwise('/welcome');

      // THEMING
      $mdThemingProvider
        .theme('default')
        .primaryPalette('amber', {
          'default': '500',
          'hue-1': 'A100',
          'hue-2': '300',
          'hue-3': '700'
        })
        .accentPalette('teal', {
          'default': '600',
          'hue-1': 'A100',
          'hue-2': '300',
          'hue-3': '700'
        })
        .warnPalette('defaultPrimary');

      $mdThemingProvider.theme('dark', 'default')
        .primaryPalette('defaultPrimary')
        .dark();

      $mdThemingProvider.theme('grey', 'default')
        .primaryPalette('grey');

      $mdThemingProvider.theme('custom', 'default')
        .primaryPalette('defaultPrimary', {
          'hue-1': '50'
        });

      $mdThemingProvider.definePalette('defaultPrimary', {
        '50': '#FFFFFF',
        '100': 'rgb(255, 198, 197)',
        '200': '#E75753',
        '300': '#E75753',
        '400': '#E75753',
        '500': '#E75753',
        '600': '#E75753',
        '700': '#E75753',
        '800': '#E75753',
        '900': '#E75753',
        'A100': '#E75753',
        'A200': '#E75753',
        'A400': '#E75753',
        'A700': '#E75753'
      });

      $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
    }
  ])

  // Broadcast events upon 4xx responses from server
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })
  .factory('AuthInterceptor', [
    '$rootScope', '$q', 'AUTH_EVENTS',
    function ($rootScope, $q, AUTH_EVENTS) {
      return {
        responseError: function (response) {
          $rootScope.$broadcast({
            401: AUTH_EVENTS.notAuthenticated,
            403: AUTH_EVENTS.notAuthorized,
            419: AUTH_EVENTS.sessionTimeout,
            440: AUTH_EVENTS.sessionTimeout
          }[response.status]);
          return $q.reject(response);
        }
      };
    }
  ])
;
