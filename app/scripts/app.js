'use strict';

var app = angular.module('uxArmyUiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

app.config(function ($routeProvider, $httpProvider) {
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
      .when('/sign-in', {
        templateUrl: 'views/sign-in.html' // auth.html
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html' // dashboard.html
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.constant('API_SERVER', 'http://127.0.0.1:8000/');