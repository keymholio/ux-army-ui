'use strict';

/* global app: true */

var app = angular.module('uxArmyUiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'header-directives',
  'config'
]);

app.config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'SignupFormCtrl'
      })
      .when('/privacy-policy', {
        templateUrl: 'views/privacy-policy.html',
      })
      .when('/thank-you', {
        templateUrl: 'views/thank-you.html',
      })
      .when('/demo-form', {
        templateUrl: 'views/demo-form.html',
        controller: 'DemoFormCtrl'
      })
      .when('/complete', {
        templateUrl: 'views/complete.html',
        controller: 'SendFriendFormCtrl'
      })
      .when('/error-page', {
        templateUrl: 'views/error-page.html'
      })
      .when('/form-finish', {
        templateUrl: 'views/form-finish.html'
      })
      .when('/sign-in', {
        templateUrl: 'views/sign-in.html',
        controller: 'AuthCtrl'
      })
      .when('/forgot-password', {
        templateUrl: 'views/forgot-password.html'
      })
      .when('/change-password', {
        templateUrl: 'views/change-password.html'
      })
      .when('/dashboard/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/participant-profile/:profileId', {
        templateUrl: 'views/participant-profile.html',
        controller: 'ParticipantCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
