'use strict';

angular.module('uxArmyUiApp')

.controller('MainCtrl', function ($scope) {
    $scope.message="My home page";
    $scope.headertemplate="views/partials/header-insecure.html";
})
.controller('LoginCtrl', function($scope) {
    $scope.message="My about page";
    $scope.headertemplate="views/partials/header-secure.html";
});
