'use strict';

/* global app: true */

var app = angular.module('header-directives', []);

app.directive('headerInit', function(){
  return {
    restrict: 'E',
    templateUrl: 'views/headers/header-init.html'
  };
});

app.directive('headerSignin', function(){
  return {
    restrict: 'E',
    templateUrl: 'views/headers/header-signin.html'
  };
});

app.directive('headerPost', function(){
  return {
    restrict: 'E',
    templateUrl: 'views/headers/header-post.html'
  };
});