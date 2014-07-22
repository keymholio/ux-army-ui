'use strict';

/*global $, app */

app.controller('DashboardCtrl', function ($scope, $window, $location, AuthService) {
	if (!$window.localStorage.token) 
	{
		$location.path('/sign-in');
		return;
	}

	$scope.token = $window.localStorage.token;
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