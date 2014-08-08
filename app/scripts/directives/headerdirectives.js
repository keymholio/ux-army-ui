'use strict';

/* global app: true */

var app = angular.module('header-directives', []);

app.directive('headerDefault', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/headers/header-default.html'
  };
});

app.directive('headerPost', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/headers/header-post.html'
  };
});
