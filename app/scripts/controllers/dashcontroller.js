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

    // opens filter group on dekstop and closes on mobile
    $(window).ready(function(){
      if( $(this).width() < 751 )
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

    // when window is resized, filter group is opened on desktop and closed on mobile
    $(window).bind('resize load',function(){
      if( $(this).width() < 751 )
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

    // get form choices
    $http.get(ENV.API_SERVER + 'choices/').success(function (data) {
          $scope.genderChoices = data.genderChoices;
          $scope.birthYearChoices = data.birthYearChoices;
          $scope.stateChoices = data.stateChoices;
          $scope.jobChoices = data.jobChoices;
          $scope.employmentChoices = data.employmentChoices;
          $scope.incomeChoices = data.incomeChoices;
          $scope.experienceChoices = data.experienceChoices;
          $scope.hoursOnlineChoices = data.hoursOnlineChoices;
          $scope.educationLevelChoices = data.educationLevelChoices;
          $scope.participateTimeChoices = data.participateTimeChoices;
        }
    );
    
    $scope.page = 1;
    $scope.total = 0;
    $scope.totalShown = 0;
    $scope.more = false;
    $scope.populating = false;
    $scope.users = [];
    
    $scope.genderCheck = {};
    $scope.jobRoleCheck = {};
    $scope.employmentCheck = {};
    $scope.incomeCheck = {};
    $scope.experienceCheck = {};
    $scope.hoursOnlineCheck = {};
    $scope.educationCheck = {};
    $scope.participateTimeCheck = {};

    $scope.filterParams = {};
    $scope.getCheckedKeys = function(filterDict)
    {
      var key;
      var fieldValues = [];
      for (key in filterDict)
      {
        if (filterDict[key] === true)
        {
          fieldValues.push(key);
        }
      }
      return fieldValues;
    };

    // check if filter is checked, then calls repopulate function
    $scope.checkFilter = function() {

      var newFilter = {
        'gender':$scope.getCheckedKeys($scope.genderCheck),
        'job':$scope.getCheckedKeys($scope.jobRoleCheck),
        'employment':$scope.getCheckedKeys($scope.employmentCheck),
        'income':$scope.getCheckedKeys($scope.incomeCheck),
        'experience':$scope.getCheckedKeys($scope.experienceCheck),
        'hoursOnline':$scope.getCheckedKeys($scope.hoursOnlineCheck),
        'educationLevel':$scope.getCheckedKeys($scope.educationCheck),
        'participateTime':$scope.getCheckedKeys($scope.participateTimeCheck)
      };
      angular.extend($scope.filterParams,newFilter);
      $scope.users = [];
      $scope.rePopulate($scope.page);
      $scope.filtering = true;
      $scope.page = 1;
    };

    // repopulates data based on filter options
    $scope.rePopulate = function(page) {
      var config = {params: angular.extend({'page':page}, $scope.filterParams)};
      $http.get(ENV.API_SERVER + 'api/',config).success(function(data){
        $scope.users = $scope.users.concat(data.results);

        // evaluate age by using birthYear
        var currentTime = new Date();
        var year = currentTime.getFullYear();

        for (var u = 0; u < $scope.users.length; u++) {
          if ($scope.users[u].birthYear === null){
            $scope.users[u].age = 'n/a';
              
          } else {
            $scope.users[u].age = year - $scope.users[u].birthYear;
          }

          // additionally checking if state d.n.e. so result can display "n/a"
          if ($scope.users[u].state === ''){
            $scope.users[u].state = 'n/a';
          }
        }
      });
    };

    // populate dashboard with users function 
    $scope.populate = function (page) {

      if (!$scope.populating) {
        $scope.populating = true;
      }

      $http({
          method: 'GET',
          url: ENV.API_SERVER + 'api/',
          params: {'page': page}
        }).success(function(data) {
          $scope.users = $scope.users.concat(data.results);
          $scope.total = data.count;
          $scope.itemsPerPage = data.results.length;
          $scope.totalShown = $scope.page * 24;
          $scope.isShownMoreThanTotal();
          $scope.populating = false;

          // evaluate age by using birthYear
          var currentTime = new Date();
          var year = currentTime.getFullYear();

          for (var u = 0; u < $scope.users.length; u++) {
            if ($scope.users[u].birthYear === null){
              $scope.users[u].age = 'n/a';
              
            } else {
              $scope.users[u].age = year - $scope.users[u].birthYear;
            }

            // additionally checking if state d.n.e. so result can display "n/a"
            if ($scope.users[u].state === ''){
              $scope.users[u].state = 'n/a';
            }
          }
        });
    };

    $scope.nextPage = function () {
      if (!$scope.populating && $scope.more) {
        $scope.page = $scope.page + 1;
        if ($scope.filtering === true) {
          $scope.rePopulate($scope.page);
        } else {
          $scope.populate($scope.page);
        }
        
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
