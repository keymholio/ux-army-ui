'use strict';

/* global app */

app.controller('SignupFormCtrl', ['$scope', '$http', 'ENV', function ($scope, $http, ENV){

    // auto capitalize first name
    $scope.$watch('firstName', function() {
        if (!angular.isUndefined($scope.firstName)){
          $scope.firstName = $scope.firstName.substring(0,1).toUpperCase()+$scope.firstName.substring(1);
        }
      });

    // auto capitalize text name
    $scope.$watch('lastName', function() {
        if (!angular.isUndefined($scope.lastName)){
          $scope.lastName = $scope.lastName.substring(0,1).toUpperCase()+$scope.lastName.substring(1);
        }
      });

    $scope.postSuccess = function () {
          window.location = '#thank-you';
        };

    // submit sign up form function
    $scope.submitSignUpForm = function () {

          $scope.formData.name = $scope.firstName + ' ' + $scope.lastName;

          $http({
            url: ENV.API_SERVER + 'api/',
            method: 'POST',
            data: $scope.formData
          }).
          success(function (response) {
              $scope.formResponse = response;
              $scope.postSuccess();
            }
          ).
          error(function () {
              $scope.existingEmail = 'Email address already registered';
            }
          );;
        };
        //end of submitSignUpForm function
  }]);

app.controller('DemoFormCtrl', ['$scope', '$http', 'ENV', function ($scope, $http, ENV){
    $scope.parser = document.createElement('a');

    $scope.$watch('url', function () {
          $scope.parser.href = $scope.url;
        });

    // get participant data function (name, email, id via hashed link)
    $scope.getParticipantData = function () {
        $scope.url = window.location;
        $scope.hashed = $scope.url.hash.replace('#/demo-form#','');
        var hashedData = {
            'hashed': $scope.hashed
          };

        // demo form check error function
        $scope.demoFormCheckError = function () {
            window.location = '#error-page';
          };
        //end of demoFormCheckError function

        $http({
            url: ENV.API_SERVER + 'demo-form-check/',
            method: 'POST',
            data: hashedData
          }).
          success(function (data) {
              $scope.checkedName = data.name;
              $scope.checkedEmail = data.email;
              $scope.checkedId = data.id;
            }
          ).
          error(function () {
              $scope.demoFormCheckError();
            }
          );
      };
      //end of getParticipantData function

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

    $scope.postSuccess = function () {
        window.location = '#complete';
      };

    // submit demo form function
    $scope.submitDemoForm = function () {

        $http({
            url: ENV.API_SERVER + 'api/' + $scope.checkedId + '/',
            method: 'PUT',
            data : $scope.formData
          }).
          success(function (response) {
              $scope.formResponse = response;
              $scope.postSuccess();
            }
        );
      };
      //end of submitDemoForm function
  }]);

app.controller('SendFriendFormCtrl', ['$scope', '$http', 'ENV', function ($scope, $http, ENV){

    // send to friend form function
    $scope.sendToFriend = function () {
        
        $http({
          url: ENV.API_SERVER + 'send-to-friend/',
          method: 'POST',
          data: $scope.formData
        }).success(function (response)
            {
              $scope.formData.fromName = '';
              $scope.formData.fromEmail = '';
              $scope.formData.toName = '';
              $scope.formData.toEmail = '';
              $scope.sendToFriendPost = 'Thank you for sharing!';
            }
          );
      };
      //end of sendToFriend function
  }]);