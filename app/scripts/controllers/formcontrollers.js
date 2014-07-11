'use strict';

/*global $, app */

app.controller('SignupFormCtrl', function($scope, $http){

  $scope.postSuccess = function()
        {
          window.location = '#thank-you';
        };
  $scope.submitForm = function()
        {
          var formName = $('#main-form-name').val();
          var formEmail = $('#main-form-email').val();

          $http({
            url: 'http://127.0.0.1:8000/api/',
            method: 'POST',
            data: { 'name':formName, 'email':formEmail }
          }).success(function(response)
                {
                  $scope.formResponse = response;
                  $scope.postSuccess();
                }
            );
        };
    //end of submitForm function
});

app.controller('DemoFormCtrl', function($scope, $http){

  $http.get('http://127.0.0.1:8000/choices/').success(function (data)
        {
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

  $scope.postSuccess = function()
        {
          window.location = '#thank-you';
        };
  $scope.handleGender = function()
  {
    $('[name="gender"]').each(function(){
      if (this.checked)
      {
        localStorage.gender = this.value;
      }

    });
    return localStorage.gender;
  };
  $scope.submitForm = function()
        {
          var formData = {
            'name':$('#demoFormName').val(),
            'email': $('#demoFormEmail').val(),
            'phone': $('#demoFormPhone').val(),
            'gender': $scope.handleGender(),
            'birthYear': $('#demoFormBirthYear').val(),
            'state': $('#demoFormState').val(),
            'job': $('#demoFormJob').val(),
            'employment': $('#demoFormEmployment').val(),
            'income': $('#demoFormIncome').val(),
            'experience': $('#demoFormExperience').val(),
            'hoursOnline': $('#demoFormHoursOnline').val(),
            'educationLevel': $('#demoFormEducationLevel').val(),
            'participateTime': $('#demoFormParticipateTime').val()
          };

          $http({
            url: 'http://127.0.0.1:8000/api/1/',
            method: 'PUT',
            data : formData
          }).success(function(response)
                {
                  $scope.formResponse = response;
                  $scope.postSuccess();
                }
            );
        };
    //end of submitForm function
});
