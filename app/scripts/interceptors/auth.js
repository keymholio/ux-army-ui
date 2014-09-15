'use strict';

/* global app */

app.factory('AuthInterceptor', ['$rootScope', '$q', '$location', function ($rootScope, $q, $window, $location){
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (localStorage.token) {
        config.headers.Authorization = 'Token ' + localStorage.token;
      }
      return config;
    },

    responseError: function (response) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        $location.path('/sign-in');
        return $q.reject(response);
      }
      
      return $q.reject(response);
    }
  };
}]);
