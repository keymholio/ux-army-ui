"use strict";var app=angular.module("uxArmyUiApp",["ngCookies","ngResource","ngSanitize","ngRoute","header-directives","config"]);app.config(["$routeProvider","$httpProvider",function(a,b){b.interceptors.push("AuthInterceptor"),a.when("/",{templateUrl:"views/main.html",controller:"SignupFormCtrl"}).when("/privacy-policy",{templateUrl:"views/privacy-policy.html"}).when("/thank-you",{templateUrl:"views/thank-you.html"}).when("/demo-form",{templateUrl:"views/demo-form.html",controller:"DemoFormCtrl"}).when("/error-page",{templateUrl:"views/error-page.html"}).when("/form-finish",{templateUrl:"views/form-finish.html"}).when("/sign-in",{templateUrl:"views/sign-in.html",controller:"AuthCtrl"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("config",[]).constant("ENV",{name:"production",API_SERVER:"http://ux-army-api.herokuapp.com/api/"}),app.controller("SignupFormCtrl",["$scope","$http","ENV",function(a,b,c){a.postSuccess=function(){window.location="#thank-you"},a.submitForm=function(){var d=$("#main-form-name").val(),e=$("#main-form-email").val();b({url:c.API_SERVER+"api/",method:"POST",data:{name:d,email:e}}).success(function(b){a.formResponse=b,a.postSuccess()})}}]),app.controller("DemoFormCtrl",["$scope","$http","ENV",function(a,b,c){a.parser=document.createElement("a"),a.$watch("url",function(){a.parser.href=a.url}),a.init=function(){a.url=window.location,a.hashed=a.url.hash.replace("/","");var d={hashed:a.hashed};a.demoFormCheckError=function(){window.location="#error-page"},b({url:c.API_SERVER+"demo-form-check/",method:"POST",data:d}).success(function(b){a.checkedName=b.name,a.checkedEmail=b.email,a.checkedId=b.id}).error(function(){a.demoFormCheckError()})},b.get(c.API_SERVER+"choices/").success(function(b){a.genderChoices=b.genderChoices,a.birthYearChoices=b.birthYearChoices,a.stateChoices=b.stateChoices,a.jobChoices=b.jobChoices,a.employmentChoices=b.employmentChoices,a.incomeChoices=b.incomeChoices,a.experienceChoices=b.experienceChoices,a.hoursOnlineChoices=b.hoursOnlineChoices,a.educationLevelChoices=b.educationLevelChoices,a.participateTimeChoices=b.participateTimeChoices}),a.postSuccess=function(){window.location="#thank-you"},a.handleGender=function(){return $('[name="gender"]').each(function(){this.checked&&(localStorage.gender=this.value)}),localStorage.gender},a.submitForm=function(){var d={name:$("#demoFormName").val(),email:$("#demoFormEmail").val(),phone:$("#demoFormPhone").val(),gender:a.handleGender(),birthYear:$("#demoFormBirthYear").val(),state:$("#demoFormState").val(),job:$("#demoFormJob").val(),employment:$("#demoFormEmployment").val(),income:$("#demoFormIncome").val(),experience:$("#demoFormExperience").val(),hoursOnline:$("#demoFormHoursOnline").val(),educationLevel:$("#demoFormEducationLevel").val(),participateTime:$("#demoFormParticipateTime").val()};b({url:c.API_SERVER+"api/"+a.checkedId+"/",method:"PUT",data:d}).success(function(b){a.formResponse=b,a.postSuccess()})}}]),app.controller("AuthCtrl",["$scope","$location","AuthService",function(a,b,c){a.login=function(){var d=a.loginUsername,e=a.loginPassword;d&&e?c.login(d,e).then(function(){b.path("/dashboard")},function(b){a.loginError=b}):a.error="Username and password required"}}]),app.controller("DashboardCtrl",["$scope","$window","$location","AuthService",function(a,b,c,d){return b.localStorage.token?(a.token=b.localStorage.token,a.username=localStorage["user.name"],void(a.logout=function(){d.logout().then(function(){c.path("/sign-in")},function(b){a.error=b})})):void c.path("/sign-in")}]);var app=angular.module("header-directives",[]);app.directive("headerInit",function(){return{restrict:"E",templateUrl:"views/headers/header-init.html"}}),app.directive("headerSignin",function(){return{restrict:"E",templateUrl:"views/headers/header-signin.html"}}),app.directive("headerPost",function(){return{restrict:"E",templateUrl:"views/headers/header-post.html"}}),app.factory("AuthService",["$http","$window","$q","ENV",function(a,b,c,d){var e=function(e,f,g){var h=d.API_SERVER+g,i=c.defer();return a.post(h,"username="+e+"&password="+f,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(a){var c=a.data.token;c?(b.localStorage.token=c,localStorage["user.name"]=e,i.resolve(!0)):i.reject("Invalid data from server")},function(a){i.reject(a.data.error)}),i.promise},f=function(){var e=c.defer(),f=d.API_SERVER+"logout/";return a.post(f).then(function(){b.localStorage.removeItem("token"),b.localStorage.removeItem("username"),e.resolve()},function(a){e.reject(a.data.error)}),e.promise};return{login:function(a,b){return e(a,b,"login/")},logout:function(){return f()}}}]),app.factory("AuthInterceptor",["$rootScope","$q","$window","$location",function(a,b,c,d){return{request:function(a){return a.headers=a.headers||{},c.localStorage.token&&(a.headers.Authorization="Token "+c.localStorage.token),a},responseError:function(a){return 401===a.status||403===a.status?(c.localStorage.removeItem("token"),c.localStorage.removeItem("user.name"),void d.path("/sign-in")):b.reject(a)}}}]);