'use strict';

angular.module('uxArmyUiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/thank-you', {
        templateUrl: 'views/thank-you.html',
      })
      .when('/404', {
        templateUrl: '404.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
