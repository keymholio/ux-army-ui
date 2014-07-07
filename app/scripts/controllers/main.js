'use strict';

var app = angular.module('uxArmyUiApp');
 
app.controller('MainCtrl', function ($scope) {

    $scope.message='My home page';
    $scope.headertemplate='views/partials/header-init.html';

  });

app.controller('SigninCtrl', function($scope) {

    $scope.message='My sign in page';
    $scope.headertemplate='views/partials/header-signin.html';

  });

app.controller('PostCtrl', function($scope) {

    $scope.message='My dashboard page';
    $scope.headertemplate='views/partials/header-post.html';

  });
