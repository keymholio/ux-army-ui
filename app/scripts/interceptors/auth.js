'use strict';

/*global $, app */

app.factory('AuthInterceptor', function ($rootScope, $q, $window, $location) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers.Authorization = 'Token ' + $window.localStorage.token;
      }
      return config;
    },

    responseError: function (response) {
      if (response.status === 401 || response.status === 403) {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('user_name');
        $location.path('/sign-in');
        return;
      }
      return $q.reject(response);
    }
  };
});