'use strict';

/*global $, app */

//var app = angular.module('infiniteScroll-directive', []);

app.directive('infiniteScroll', function ($window) {
  return {
    link: function (scope, element, attr) {
      $window = angular.element($window);
      $window.bind('scroll', function () {
        if ($window.scrollTop() + $window.height() >= element.offset().top + element.innerHeight()) {
          scope.$apply(attr.infiniteScroll);
        }
      });
    }
  };
});