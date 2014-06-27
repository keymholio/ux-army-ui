'use strict';

var app = angular.module('uxArmyUiApp');
 
app.controller('MainCtrl', function ($scope) {

    $scope.message='My home page';
    $scope.headertemplate='views/partials/header-init.html';

  });

