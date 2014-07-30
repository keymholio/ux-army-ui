'use strict';

/*global $, app */

app.controller('ParticipantCtrl', ['$scope', '$http', '$location', '$routeParams', 'AuthService', function ($scope, $http, $location, $routeParams, AuthService){

	if (!localStorage.token) {
		$location.path('/sign-in');
		return;
	}
	console.log($routeParams.profileId);

	$scope.token = localStorage.token;
	$scope.username = localStorage['user.name'];

	var config = { 'headers': {'Authorization': 'Token ' + $scope.token}};

	$http.get('http://ux-army-api.herokuapp.com/api/' + $routeParams.profileId + '/', config).success(function(data) {
	    $scope.user = data;

	    var currentTime = new Date();
	    var year = currentTime.getFullYear();
	    $scope.age = year - $scope.user.birthYear;
	    if ($scope.user.birthYear == null){
	    	$scope.age = null;
	    }

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