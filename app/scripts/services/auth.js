'use strict';

/* global app */

app.factory('AuthService', ['$http', '$window', '$q', 'ENV', function ($http, $window, $q, ENV){

    var authenticate = function (username, password, endpoint) {

        var url = ENV.API_SERVER + endpoint;
        var deferred = $q.defer();

        $http.post(url, 'username=' + username + '&password=' + password, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(
            function (response) {
                // success callback
                var token = response.data.token;

                if (token && username) {
                  $window.localStorage.token = token;
                  localStorage['user.name'] = username;
                  deferred.resolve(true);
                } else {
                  deferred.reject('Invalid data from server');
                }
              },
            function (response) {
                deferred.reject(response.data.error);
              }
        );

        return deferred.promise;
      };

    var logout = function () {
        var deferred = $q.defer();
        var url = ENV.API_SERVER + 'logout/';

        $http.post(url).then(
          function () {
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('user.name');
            deferred.resolve();
          },
          function (error) {
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('user.name');
            deferred.resolve();
            // deferred.reject(error.data.error);
          }
        );
        return deferred.promise;
      };
      //end of logout function

    return {
        register: function (username, password) {
            return authenticate(username, password, 'register/');
          },
        login: function (username, password) {
            return authenticate(username, password, 'login/');
          },
        logout: function () {
            return logout();
          }

      };
  }]);
