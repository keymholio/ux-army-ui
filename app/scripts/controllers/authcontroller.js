'use strict';

/*global $, app */

app.controller('AuthCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService){
    $scope.login = function () {
        var username = $scope.loginUsername;
        var password = $scope.loginPassword;

        if (username && password) {
          AuthService.login(username, password).then(
                function () {
                    $location.path('/dashboard');
                  },
                function (error) {
                    $scope.loginError = error;
                  }
            );
        } else {
          $scope.error = 'Username and password required';
        }
      };
      //end of login function
  }]);