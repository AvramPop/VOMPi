(function() {
    'use strict';

    angular
        .module('app.common')
        .service('apiService', apiService);

    apiService.$inject = ['$resource', '$http'];

    /* @ngInject */
    function apiService($resource) {
        var baseURL = '/api',
            services = {
                cities: $resource(baseURL + '/cities', {}, {
                    'list': {
                        method: 'GET'
                    }
                })
            };

        return services;
    }
})();
