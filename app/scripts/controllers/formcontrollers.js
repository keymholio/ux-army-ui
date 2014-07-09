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

