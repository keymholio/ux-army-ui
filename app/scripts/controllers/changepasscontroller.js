'use strict';

/*global $, app */

app.controller('DashboardCtrl', ['$scope', '$http', 'ENV', function ($scope, $http, ENV){

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
  }]);
