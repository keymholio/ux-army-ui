'use strict';

/* global app */

app.controller('AuthCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService){

    // if user is already signed in, redirect to dashboard
    if (localStorage.token) {
      $location.path('/dashboard');
      return;
    }

    $scope.register = function () {
        var username = $scope.registerUsername;
        var password = $scope.registerPassword;

        if (username && password) {
          AuthService.register(username, password).then(
            function () {
              $location.path('/dashboard');
            },
            function (error) {
              $scope.registerError = error;
            }
          );
        } else {
          $scope.registerError = 'Username and password required';
        }
      };

    $scope.login = function () {
        var username = $scope.loginUsername;
        var password = $scope.loginPassword;

        if (username && password) {
          AuthService.login(username, password).then(
                function () {
                    $location.path('/dashboard');
                  },
                function () {
                    $scope.loginError = 'Incorrect username or password';
                    $scope.loginPassword = null;
                  }
            );
        } else {
          $scope.error = 'Username and password required';
        }
      };
      //end of login function
  }]);
