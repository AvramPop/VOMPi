( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .factory( 'HTTPInterceptor', HTTPInterceptor );

    HTTPInterceptor.$inject = [ '$q', 'localStorageService', 'Materialize' ];

    /* @ngInject */
    function HTTPInterceptor( $q, localStorageService, Materialize ) {
        var factory = {
            request: RequestFunc,
            requestError: RequestErrorFunc,
            response: ResponseFunc,
            responseError: ResponseErrorFunc
        };

        return factory;

        function RequestFunc( req ) {
            var bareerToken = localStorageService.get( 'token' );

            req.headers = req.headers || {};
            if ( bareerToken ) {
                req.headers[ 'X-User-Token' ] = bareerToken;
            }
            return req;
        }

        function RequestErrorFunc( req ) {

        }

        function ResponseFunc( res ) {
            return res;
        }

        function ResponseErrorFunc( res ) {
            if ( res.data && res.data.error && res.data.error.msg ) {
                Materialize.toast( res.data.error.msg, 4000, 'error' );
            } else {
                Materialize.toast( 'Error: ' + res.statusText + ', something goes wrong :-(', 4000, 'error' );
            }

            return $q.reject( res );
        }
    }
} )();
