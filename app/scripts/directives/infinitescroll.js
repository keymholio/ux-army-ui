'use strict';

/*global $, app */

//var app = angular.module('infiniteScroll-directive', []);

app.directive('infiniteScroll', function ($window) {
  return {
    link: function (scope, element, attrs) {
      var elementBottom, windowBottom;
      $window = angular.element($window);
      $window.bind('scroll', function() {
        windowBottom = $window.height() + $window.scrollTop();
        elementBottom = element.offset().top + element.innerHeight();
        if (windowBottom === $(document).height()) {
          scope.$apply(attrs.infiniteScroll);
        }
      });

    }
  };
});
