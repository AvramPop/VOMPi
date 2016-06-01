// =============================================================================
// APP RUN
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app' )
        .run( Run );

    Run.$inject = [ '$rootScope', '$location', 'OAuthService' ];

    /* @ngInject */
    function Run( $rootScope, $location, OAuthService ) {
        console.info( 'Running RUN...' );

        $rootScope.$on( '$stateChangeStart', function ( e, toState ) {
            if ( !OAuthService.isLogin() && toState.name !== 'login' ) {
                // e.preventDefault();
                // $state.go( 'login' );
                $location.url( '/login' );
            }
        } );
    }
} )();
