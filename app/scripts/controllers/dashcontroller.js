'use strict';

/*global $, app */

app.controller('DashboardCtrl', function ($scope, $http, $location, AuthService) {
	if (!localStorage.token) {
		$location.path('/sign-in');
		return;
	}

	$scope.token = localStorage.token;
	$scope.username = localStorage['user.name'];

	$scope.logout = function () {
	    AuthService.logout().then(
	      function () {
	        $location.path('/sign-in');
	      },
	      function (error) {
	        $scope.error = error;
	      }
	    );
	  };
});