"use strict";angular.module("uxArmyUiApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html"}).when("/privacy-policy",{templateUrl:"views/privacy-policy.html"}).when("/thank-you",{templateUrl:"views/thank-you.html"}).when("/demo-form",{templateUrl:"views/demo-form.html"}).when("/sign-in",{templateUrl:"views/sign-in.html"}).otherwise({redirectTo:"/"})}]);var app=angular.module("uxArmyUiApp");app.controller("MainCtrl",["$scope",function(a){a.message="My home page",a.headertemplate="views/partials/header-init.html"}]),app.controller("SigninCtrl",["$scope",function(a){a.message="My sign in page",a.headertemplate="views/partials/header-signin.html"}]),app.controller("FirstFormCtrl",["$scope","$http",function(a,b){a.postSuccess=function(){window.location="#thank-you"},a.submitForm=function(){var c=$("#main-form-name").val(),d=$("#main-form-email").val();b({url:"http://127.0.0.1:8000/api/",method:"POST",data:{name:c,email:d}}).success(function(b){a.formResponse=b,a.postSuccess()})}}]);