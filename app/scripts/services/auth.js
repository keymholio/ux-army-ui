'use strict';

/*global $, app */

app.factory('AuthService', function ($http, $window, $q, API_SERVER) {

    var authenticate = function (email, password, endpoint) {
        
        var url = API_SERVER + endpoint;
        var deferred = $q.defer();
        
        $http.post(url, 'email=' + email + '&password=' + password, {
            headers: {
                'Content-Type': 'application/json'
              }
            }).then(
            function (response) {
                // success callback
                var token = response.data.token;
                var email = response.data.email;

                if (token && email) {
                  $window.localStorage.token = token;
                  $window.localStorage.email = email;
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
        var url = API_SERVER + 'logout/';

        $http.post(url).then(
          function () {
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('email');
            deferred.resolve();
          },
          function (error) {
            deferred.reject(error.data.error);
          }
        );
        return deferred.promise;
      };

    return {
        login: function (email, password) {
            return authenticate(email, password, 'login/');
          },
        logout: function () {
            return logout();
          }

      };

  });