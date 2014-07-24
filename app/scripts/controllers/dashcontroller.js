'use strict';

/*global $, app */

app.controller('DashboardCtrl', function ($scope, $http, $location, AuthService) {
	if (!localStorage.token) {
		$location.path('/sign-in');
		return;
	}

	$scope.token = localStorage.token;
	$scope.username = localStorage['user.name'];

	var config = { 'headers': {'Authorization': 'Token ' + $scope.token}};

	$http.get('http://ux-army-api.herokuapp.com/api/', config).success(function(data) {
	    $scope.users = data;
	  }).error(function(data, status) {
	    alert('get data error!');
	  });

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

	$(document).ready(function() {
    var panels = $('.filter-options');
    var panelsButton = $('.dropdown-filter');
    panels.hide();

    //Click dropdown
    panelsButton.click(function() {
        //get data-for attribute
        var dataFor = $(this).attr('data-for');
        var idFor = $(dataFor);

        //current button
        var currentButton = $(this);
        idFor.slideToggle(200, function() {
            //Completed slidetoggle
            if(idFor.is(':visible'))
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
            }
            else
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
            }
        })
    });
});
});