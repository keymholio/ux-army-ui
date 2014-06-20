'use strict';

var app = angular.module('uxArmyUiApp');
 app.controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

 app.controller('FormCtrl1', ['$scope', function($scope) {
    $scope.formInfo = {};
    $scope.saveData = function() {
 		console.log($scope.formInfo);
    };
  }]);
  
  app.controller('FormCtrl2', ['$scope', function($scope) {
    $scope.formInfo = {};
    $scope.saveData = function() {
 		console.log($scope.formInfo);
    };
  }]);
