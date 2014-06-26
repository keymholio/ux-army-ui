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
        templateUrl: 'views/main.html'
      })
      .when('/privacy-policy', {
        templateUrl: 'views/privacy-policy.html',
      })
      .when('/thank-you', {
        templateUrl: 'views/thank-you.html',
      })
      .when('/demo-form', {
        templateUrl: 'views/demo-form.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
