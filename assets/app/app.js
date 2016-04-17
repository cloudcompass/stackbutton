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

sbapp.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider',
  function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
    $stateProvider
      .state('home', {
        url: '/welcome',
        templateUrl: 'app/views/landing.html',
      })
      .state('app', {
        url: '/app',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('app.projects', {
        url: '/app/projects',
        templateUrl: 'app/views/projects.html',
        data: {
          title: 'Projects'
        }
      })
      .state('app.dashboard', {
        url: '/app/dashboard',
        templateUrl: 'app/views/dashboard.html',
        data: {
          title: 'Dashboard'
        }
      })
      .state('app.profile', {
        url: '/app/profile',
        templateUrl: 'app/views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        data: {
          title: 'Profile'
        }
      })
      .state('app.table', {
        url: '/app/table',
        controller: 'TableController',
        controllerAs: 'vm',
        templateUrl: 'app/views/table.html',
        data: {
          title: 'Table'
        }
      });

    $urlRouterProvider.otherwise('/welcome');

    $mdThemingProvider
      .theme('default')
      .primaryPalette('yellow', {
        'default': '800'
      })
      .accentPalette('indigo', {
        'default': '400'
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
