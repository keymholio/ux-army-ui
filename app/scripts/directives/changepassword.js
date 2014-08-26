'use strict';

/* global app: true */

app.directive('changePassword', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/change-password.html'
  };
});
