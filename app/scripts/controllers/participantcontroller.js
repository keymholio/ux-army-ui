'use strict';

/*global $, app */

app.controller('ParticipantCtrl', ['$scope', '$http', '$window', '$location', '$routeParams', 'AuthService', 'ENV', function ($scope, $http, $window, $location, $routeParams, AuthService, ENV){

    // if user is not signed in, redirect to sign in
    if (!localStorage.token) {
      $location.path('/sign-in');
      return;
    }

    $scope.token = localStorage.token;
    $scope.username = localStorage.username;

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

            // set form data options to different variables to prevent scope change 
            $scope.formData.nameGet = $scope.formData.name;
            $scope.formData.emailGet = $scope.formData.email;
            $scope.formData.genderGet = $scope.formData.gender;
            $scope.formData.stateGet = $scope.formData.state;
            $scope.formData.phoneGet = $scope.formData.phone;
            $scope.formData.emailGet = $scope.formData.email;
            $scope.formData.jobGet = $scope.formData.job;
            $scope.formData.experienceGet = $scope.formData.experience;
            $scope.formData.participateTimeGet = $scope.formData.participateTime;
            $scope.formData.participateDayGet = $scope.formData.participateDay;

          }).error(function() {
            $window.alert('User does not exist!');
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
          $scope.experienceChoices = data.experienceChoices;
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

    // change password function 
    $scope.submitPassChange = function () {
        
        if ($scope.passChange.newPassword === $scope.passChange.confirm){
          $http({
              url: ENV.API_SERVER + 'update-pass/',
              method: 'PUT',
              data : $scope.passChange
            }).
            success(function () {
                $('#passwordModal').modal('hide');
                $('.modal-backdrop').remove();
              }
            ).
            error(function () {
                $scope.changePassIncorrectError = 'The password entered is incorrect';
              }
            );
        } else {
          $scope.changePassMatchError = 'Passwords do not match';
        }

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