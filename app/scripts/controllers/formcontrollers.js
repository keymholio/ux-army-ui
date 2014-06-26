app.controller('FirstFormCtrl', function($scope, $http){

	$scope.submitForm = function()
	{
		var form_name = $("#main-form-name").val();
		var form_email = $("#main-form-email").val();

	 	$http({
		    url: 'http://127.0.0.1:8000/api/',
		    method: "POST",
		    data: { 'name':form_name, 'email':form_email }
		}).success(function(response)
		 	{
		 		$scope.form_response = response;
		 	}
	 	);
	}
	//end of submitForm function

});

app.controller('DemoFormCtrl', function($scope, $http){

	$scope.submitForm = function()
	{
		var form_name = $("#demo-form-name").val();
		var form_email = $("#demo-form-email").val();
		var form_phone = $("#phone-form-email").val();

	 	$http({
		    url: 'http://127.0.0.1:8000/api/11/',
		    method: "POST",
		    data: { 'name':form_name, 'email':form_email, 'phone':form_phone }
		}).success(function(response)
		 	{
		 		$scope.form_response = response;
		 	}
	 	);
	}
	//end of submitForm function
		
});