'use strict';

/* global app: true */

app.directive('editParticipant', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/edit-participant.html'
  };
});
