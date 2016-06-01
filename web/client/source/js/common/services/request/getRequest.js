( function() {
    'use strict';

    angular
        .module( 'app.common' )
        .service( 'GetRequest', getRequestFunc );

    getRequestFunc.$inject = [ '$http', '$q' ];

    /* @ngInject */
    function getRequestFunc( $http, $q ) {

        var self = {
            program: {},
            get_data: get_dataFunc
        };

        function get_dataFunc( url ) {
            var defer = $q.defer();
            $http.get( url ).then( function( data ) {
                defer.resolve( data );
            } );
            return defer.promise;
        }
        return self;
    }
} )();
