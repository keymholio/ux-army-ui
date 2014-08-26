'use strict';

/* global app: true */

app.directive('filterOptions', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/filter-options.html'
  };
});
