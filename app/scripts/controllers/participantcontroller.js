'use strict';

/*global $, app */

app.controller('ParticipantCtrl', ['$scope', '$http', '$location', '$routeParams', 'AuthService', 'ENV', function ($scope, $http, $location, $routeParams, AuthService, ENV){

    // if user is not signed in, redirect to sign in
    if (!localStorage.token) {
      $location.path('/sign-in');
      return;
    }

    $scope.token = localStorage.token;
    $scope.username = localStorage['user.name'];

    var config = { 'headers': {'Authorization': 'Token ' + $scope.token}};

    // get participant data function
    $scope.getParticipantData = function () {
        $http.get(ENV.API_SERVER + 'api/' + $routeParams.profileId + '/', config).success(function(data) {

            $scope.formData = data;
            $scope.currentProfileId = $scope.formData.id;

            // evaluate age by using birthYear
            var currentTime = new Date();
            var year = currentTime.getFullYear();
            $scope.age = year - $scope.formData.birthYear;
            if ($scope.formData.birthYear === null){
              $scope.age = null;
              return $scope.age;
            }

          }).error(function(data, status) {
            alert('User does not exist!');
            $location.path('/dashboard');
          });
      };
    // end of getParticipantData function

    $scope.getParticipantData();
    
    // get form choices
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
  
    // submit edit form (in modal) function
    $scope.submitEditForm = function () {

        $http({
            url: ENV.API_SERVER + 'api/' + $scope.currentProfileId + '/',
            method: 'PUT',
            data : $scope.formData
          }).
          success(function (response) {
              $scope.formResponse = response;
              $('#editModal').modal('hide');
              $('.modal-backdrop').remove();
              $scope.getParticipantData();
            }
          );
      };
      //end of submitEditForm function

    $scope.deleteUser = function () {
      $http.delete(ENV.API_SERVER + 'api/' + $scope.currentProfileId + '/').success(function () {
        $('#deleteModal').modal('hide');
        $('.modal-backdrop').remove();
        $location.path('/dashboard');
      });
    };

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

    // modal error fix when back button is pressed
    $(window).on('hashchange', function() {
      $('.modal-backdrop').remove();  
    });
  }]);