'use strict';

/*global $, app */

app.controller('AuthCtrl', function ($scope, $location, AuthService) {
    $scope.login = function () {
        var email = $scope.loginEmail;
        var password = $scope.loginPassword;

        if (email && password) {
            AuthService.login(email, password).then(
                function () {
                    $location.path('/dashboard');
                },
                function (error) {
                    $scope.loginError = error;
                }
            );
        } else {
            $scope.error = 'email and password required';
        }
    };
});