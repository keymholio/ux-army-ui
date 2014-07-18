'use strict';

/*global $, app */

app.controller('SignupFormCtrl', function($scope, $http, ENV){

  $scope.postSuccess = function()
        {
          window.location = '#thank-you';
        };
  $scope.submitForm = function()
        {
          var formName = $('#main-form-name').val();
          var formEmail = $('#main-form-email').val();

          $http({
            url: ENV.API_SERVER + 'api/',
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

app.controller('DemoFormCtrl', function($scope, $http, ENV){
  
  $scope.parser = document.createElement('a');

  $scope.$watch('url', function ()
        {
          $scope.parser.href = $scope.url;
        });

  $scope.init = function ()
        {
          $scope.url = window.location;
          $scope.hashed = $scope.url.hash.replace('/','');

          $scope.demoFormCheckError = function()
          {
            window.location = '#error-page';
          };

          $http.post(ENV.API_SERVER + 'demo-form-check').
              sucess(function (data)
                {
                  $scope.checkedName = data.name;
                  $scope.checkedEmail = data.email;
                  $scope.checkedId = data.id;
                }
              ).
              error(function (data, status)
                {
                  $scope.demoFormCheckError();
                }
              );
        };


  $http.get(ENV.API_SERVER + 'choices/').success(function (data)
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
            url: ENV.API_SERVER + 'api/2/',
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
