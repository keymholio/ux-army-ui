'use strict';

/*global $, app */

app.controller('DashboardCtrl', ['$scope', '$http', '$location', 'ENV', 'AuthService', function ($scope, $http, $location, ENV, AuthService){

	// if user is not signed in, redirect to sign in
	if (!localStorage.token) {
		$location.path('/sign-in');
		return;
	}

	$scope.token = localStorage.token;
	$scope.username = localStorage['user.name'];

	var config = { 'headers': {'Authorization': 'Token ' + $scope.token}};

	$scope.page = 1;
	$scope.total = 0;
	$scope.totalShown = 0;
	$scope.more = false;
	$scope.populating = false;

	$scope.populate = function (page) {
		$http({
	      method: 'GET',
	      url: ENV.API_SERVER + 'api/?page=' + page  
	    }).success(function(data) {
	      $scope.users = data.results;
	    });
	};

	$scope.nextPage = function () {
		if (!$scope.populating && $scope.more) {
			$scope.page = Number($scope.page) + 1;
			$scope.populate($scope.page);
		}
	};

	$scope.isShownMoreThanTotal = function () {
      // shows and hides "show more" button
      if ($scope.totalShown >= $scope.total) {
        $scope.more = false;
      } else {
        $scope.more = true;
      }
    };

    $scope.populate($scope.page);

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