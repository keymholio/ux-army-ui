'use strict';

/*global $, app */

app.controller('DashboardCtrl', function ($scope, $window, $location, AuthService) {
	if (!$window.localStorage.token) {
		$location.path('/sign-in');
		return;
	}
	$scope.token = $window.localStorage.token;
	$scope.email = $window.localStorage.email;

	$scope.logout = function () {
	    AuthService.logout().then(
	      function () {
	        $location.path('/');
	      },
	      function (error) {
	        $scope.error = error;
	      }
	    );
	  };
});