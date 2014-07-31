'use strict';

/*global $, app */

app.controller('ParticipantCtrl', ['$scope', '$http', '$location', '$routeParams', 'AuthService', 'ENV', function ($scope, $http, $location, $routeParams, AuthService, ENV){

	if (!localStorage.token) {
		$location.path('/sign-in');
		return;
	}
	console.log($routeParams.profileId);

	$scope.token = localStorage.token;
	$scope.username = localStorage['user.name'];

	var config = { 'headers': {'Authorization': 'Token ' + $scope.token}};

	$scope.getFormData = function () {
		$http.get(ENV.API_SERVER + 'api/' + $routeParams.profileId + '/', config).success(function(data) {

		    $scope.formData = data;
		    $scope.currentProfileId = $scope.formData.id;

		    var currentTime = new Date();
		    var year = currentTime.getFullYear();
		    $scope.age = year - $scope.formData.birthYear;
		    if ($scope.formData.birthYear === null){
		      $scope.age = null;
		      return $scope.age;
		    }

		  }).error(function(data, status) {
		    alert('get data error!');
		  });
	}

	$scope.getFormData();
	
	$http.get(ENV.API_SERVER + 'choices/').success(function (data) {
          $scope.genderChoices = data.genderChoices;
          $scope.birthYearChoices = data.birthYearChoices;
          $scope.stateChoices = data.stateChoices;
          $scope.jobChoices = data.jobChoices;
          $scope.employmentChoices = data.employmentChoices;
          $scope.incomeChoices = data.incomeChoices;
          $scope.experienceChoices = data.experienceChoices;
          $scope.hoursOnlineChoices = data.hoursOnlineChoices;
          $scope.educationLevelChoices = data.educationLevelChoices;
          $scope.participateTimeChoices = data.participateTimeChoices;
        }
      );
  
    $scope.submitForm = function () {

        $http({
            url: ENV.API_SERVER + 'api/' + $scope.currentProfileId + '/',
            method: 'PUT',
            data : $scope.formData
          }).
          success(function (response) {
              $scope.formResponse = response;
              $('#editModal').modal('hide');
              $scope.getFormData();
            }
        );
      };
      //end of submitForm function

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