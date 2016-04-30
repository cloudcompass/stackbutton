'use strict';

var sbapp = angular.module('sbapp', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ui.router',
  'ngMaterial',
  'nvd3'
]);

sbapp.constant('AUTH_EVENTS', {
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

  .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider',
  function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
    $stateProvider
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'app/views/landing.html'
      })
      .state('login', {
        url: '/login',
        controller: 'AuthController',
        controllerAs: 'va',
        templateUrl: 'app/views/login.html'
      })
      .state('register', {
        url: '/register',
        controller: 'AuthController',
        controllerAs: 'vm',
        templateUrl: 'app/views/register.html'
      })
      .state('home', {
        url: '',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.html',
        data: {
          title: 'Dashboard'
        }
      })
      .state('home.profile', {
        url: '/profile',
        templateUrl: 'app/views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        data: {
          title: 'Profile'
        }
      })
      .state('home.table', {
        url: '/table',
        controller: 'TableController',
        controllerAs: 'vm',
        templateUrl: 'app/views/table.html',
        data: {
          title: 'Table'
        }
      })
      .state('home.projects', {
        url: '/projects',
        templateUrl: 'app/views/projects.html',
        controller: 'ProjectController',
        controllerAs: 'vm',
        data: {
          title: 'Projects'
        }
      })
      .state('home.create', {
        url: '/create',
        templateUrl: 'app/views/createproject.html',
        controller: 'CreateController',
        controllerAs: 'vm',
        data: {
          title: 'New Project'
        }
      })
      .state('home.delete', {
        url: '/delete',
        templateUrl: 'app/views/deleteproject.html',
        controller: 'MainController',
        controllerAs: 'vm',
        data: {
          title: 'Delete Project'
        }
      })
      .state('home.plugin', {
        url: '/plugin',
        templateUrl: 'app/views/pluginConfiguration.html',
        controller: 'MainController',
        controllerAs: 'vm',
        data: {
          title: 'Configure Plugins'
        }
      })
      .state('home.addtool', {
        url: '/addtool',
        templateUrl: 'app/views/addATool.html',
        controller: 'ToolController',
        controllerAs: 'vm',
        data: {
          title: 'Add a tool'
        }
      })
    ;

    $urlRouterProvider.otherwise('/welcome');

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
  }]);
