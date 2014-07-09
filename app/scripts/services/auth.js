'use strict';

/*global $, app */

app.factory('AuthService', function ($http, $window, $q, API_SERVER) {

    var authenticate = function (username, password, endpoint) {
        
        var url = API_SERVER + endpoint;
        var deferred = $q.defer();
        
        $http.post(url, 'username=' + username + '&password=' + password, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(
            function (response) {
                // success callback
                var token = response.data.token;

                if (token) {
                  $window.localStorage.token = token;
                  localStorage['user_name'] = username;
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
            $window.localStorage.removeItem('username');
            deferred.resolve();
          },
          function (error) {
            deferred.reject(error.data.error);
          }
        );
        return deferred.promise;
      };

    return {
        login: function (username, password) {
            return authenticate(username, password, 'login/');
          },
        logout: function () {
            return logout();
          }

      };

  });