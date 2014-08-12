'use strict';

/*global $, app */

app.controller('DashboardCtrl', ['$scope', '$http', '$location', 'ENV', 'AuthService', function ($scope, $http, $location, ENV, AuthService){

    // if user is not signed in, redirect to sign in
    if (!localStorage.token) {
      $location.path('/sign-in');
      return;
    }

    $scope.token = localStorage.token;
    $scope.username = localStorage['user.name'];

    $(window).ready(function(){
      if( $(this).width() < 766 )
      {
        $('#collapse0').removeClass('in');
        $('#collapse0').addClass('out');
      }
      else
      {
        $('#collapse0').removeClass('out');
        $('#collapse0').addClass('in');
      }
    });

    $(window).bind('resize load',function(){
      if( $(this).width() < 766 )
      {
        $('#collapse0').removeClass('in');
        $('#collapse0').addClass('out');
      }
      else
      {
        $('#collapse0').removeClass('out');
        $('#collapse0').addClass('in');
        $('#collapse0').removeAttr('style');
      }
    });

    $scope.page = 1;
    $scope.total = 0;
    $scope.totalShown = 0;
    $scope.more = false;
    $scope.populating = false;
    $scope.users = [];

    $scope.populate = function (page) {

      if (!$scope.populating) {
        $scope.populating = true;
      }

      $http({
          method: 'GET',
          url: ENV.API_SERVER + 'api/?page=' + page
        }).success(function(data) {
          $scope.users = $scope.users.concat(data.results);
          $scope.total = data.count;
          $scope.itemsPerPage = data.results.length;
          $scope.totalShown = $scope.page * 24;
          $scope.isShownMoreThanTotal();
          $scope.populating = false;
        });
    };

    $scope.nextPage = function () {
      if (!$scope.populating && $scope.more) {
        $scope.page = $scope.page + 1;
        $scope.populate($scope.page);
      }
    };

    $scope.isShownMoreThanTotal = function () {
      // shows and hides "show more" button
      if ($scope.totalShown >= $scope.total) {
        $scope.more = false;
      } else {
        $scope.more = true;
      }
    };

    $scope.populate($scope.page);

    $scope.logout = function () {
        AuthService.logout().then(
          function () {
            $location.path('/sign-in');
          },
          function (error) {
            $scope.error = error;
          }
        );
      };
  }]);
