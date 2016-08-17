( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .service( 'apiService', apiService );

    apiService.$inject = [ '$resource', '$http' ];

    /* @ngInject */
    function apiService( $resource ) {
        var baseURL = '/api',
            services = {
                campaigns: $resource( baseURL + '/campaigns', {}, {
                    'list': {
                        method: 'GET'
                    }
                } )
            };

        return services;
    }
} )();
