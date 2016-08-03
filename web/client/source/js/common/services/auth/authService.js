(function() {
    'use strict';

    angular
        .module('app.common')
        .service('authService', authServiceFnc);

    authServiceFnc.$inject = ['$http'];

    /* @ngInject */
    function authServiceFnc($http) {
        var baseURL = 'http://localhost:8000/api/v1',
            services = {
                login: loginFnc
            };
            function loginFnc(credentials){
                var resp ='';
                function successCallback(response) {
                        console.log(response);
                        resp = response;
                        return response;
                        // this callback will be called asynchronously
                        // when the response is available
                    }
                    function errorCallback(response) {
                          resp=response;
                          return response;
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    }
                    $http.post(baseURL+'/admin/login', credentials).then(successCallback, errorCallback);
                //  $http({
                //           method: 'POST',
                //           url:
                //       }).then(successCallback, errorCallback );

                          return resp;
            }
        return services;
    }
})();
