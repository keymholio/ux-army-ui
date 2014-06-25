app.controller("formController", function($scope, $http){

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