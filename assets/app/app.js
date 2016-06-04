'use strict';

var sbapp = angular.module('sbapp', [
  'ngResource',
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'ngMaterial',
  'nvd3',
  'ngSails',
  'ngMessages'
]);

sbapp
// Define GLOBAL constants
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

  .factory('AuthInterceptor',
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
  )

  .config(
    function (USER_ROLES, $httpProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {

      // Broadcast events upon 4xx responses from server
      $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
          return $injector.get('AuthInterceptor');
        }
      ]);

      // Define UI states
      $stateProvider
      // LANDING PAGE
        .state('welcome', {
          url: '/welcome',
          templateUrl: 'app/views/landing.html',
          data: {
            authorizedRoles: [USER_ROLES.all]
          }
        })
        // REGISTRATION & LOGIN
        .state('account', {
          url: '',
          templateUrl: 'app/views/grayback.html',
          abstract: true,
          data: {
            authorizedRoles: [USER_ROLES.all]
          }
        })
        .state('account.login', {
          url: '/login',
          controller: 'AuthController',
          controllerAs: 'vm',
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
        // APP PARENT STATE
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
        // PROJECT DIRECTORY
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
        // PROJECT CREATE
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
        // PROJECT UPDATE
        .state('home.editproject', {
          url: '/editproject',
          templateUrl: 'app/views/editproject.html',
          controller: 'EditProjectController',
          controllerAs: 'vm',
          data: {
            title: 'Edit Project',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        // SERVICE+MODULE CREATE
        .state('home.addtool', {
          url: '/addtool',
          templateUrl: 'app/views/addATool.html',
          controller: 'ToolController',
          controllerAs: 'vm',
          data: {
            title: 'Add a tool',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })// SERVICE CONFIG
        .state('home.servicesconfig', {
          url: '/servicesconfig',
          templateUrl: 'app/views/servicesconfig.html',
          controller: 'ServicesconfigController',
          controllerAs: 'vm',
          data: {
            title: 'Configure Services',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        // PROJECT DASHBOARD
        .state('home.dashboard', {
          url: '/dashboard/{dashboardId:.+}',
          controller: 'DashboardController',
          controllerAs: 'vm',
          templateUrl: 'app/views/dashboard.html',
          data: {
            title: 'Dashboard',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        // WIDGET CREATE
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
        // USER PROFILE
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
        // TEAM CONFIG
        .state('home.team', {
          url: '/team',
          templateUrl: 'app/views/teamconfig.html',
          controller: 'TeamController',
          controllerAs: 'vm',
          data: {
            title: 'Team',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
          }
        })
        // FOR DEVELOPMENT
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
      ;

      // Redirect unknown URLs
      $urlRouterProvider.otherwise('/welcome');

      // THEMING
      $mdThemingProvider
        .theme('default')
        .primaryPalette('amber', {
          'default': '500',
          'hue-1': '100',
          'hue-2': '300',
          'hue-3': '700'
        })
        .accentPalette('teal', {
          'default': '500',
          'hue-1': '100',
          'hue-2': '300',
          'hue-3': '700'
        })
        .warnPalette('warn');

      $mdThemingProvider.theme('dark', 'default')
        .primaryPalette('amber')
        .dark();

      $mdThemingProvider.theme('grey', 'default')
        .primaryPalette('grey');

      $mdThemingProvider.definePalette('warn', {
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
  )

;
