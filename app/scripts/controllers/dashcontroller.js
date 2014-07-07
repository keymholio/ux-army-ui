'use strict';

/*global $, app */

app.controller('DashboardCtrl', function ($scope, $window, $location) {
	if (!$window.localStorage.token) {
		$location.path('/');
		return;
	}
	$scope.token = $window.localStorage.token;
	$scope.email = $window.localStorage.email;
});