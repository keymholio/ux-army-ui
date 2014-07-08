'use strict';

/* global app: true */

var app = angular.module('uxArmyUiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'header-directives'
]);

app.config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
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
        templateUrl: 'views/sign-in.html',
        controller: 'AuthCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.constant('API_SERVER', 'http://127.0.0.1:8000/');
