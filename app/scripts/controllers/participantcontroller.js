'use strict';

/*global $, app */

app.controller('ParticipantCtrl', ['$scope', '$http', '$location', 'AuthService', function ($scope, $http, $location, AuthService){

	if (!localStorage.token) {
		$location.path('/sign-in');
		return;
	}

	$scope.token = localStorage.token;
	$scope.username = localStorage['user.name'];

	var config = { 'headers': {'Authorization': 'Token ' + $scope.token}};

	$http.get('http://ux-army-api.herokuapp.com/api/', config).success(function(data) {
	    $scope.users = data;
	  }).error(function(data, status) {
	    alert('get data error!');
	  });

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
}]);