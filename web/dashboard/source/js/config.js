// =============================================================================
// APP CONFIG / SET PAGE ROUTES
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app' )
        .config( Config );

    Config.$inject = [ '$httpProvider', '$logProvider',
        'RestangularProvider', 'localStorageServiceProvider', 'ENV'
    ];

    /* @ngInject */
    function Config( $httpProvider, $logProvider,
        RestangularProvider, localStorageServiceProvider, ENV ) {
        console.info( 'Running CONFIG...' );

        $logProvider.debugEnabled( false );
        $httpProvider.interceptors.push( 'HTTPInterceptor' );

        // API Base URL
        RestangularProvider
            .setBaseUrl( ENV.API.url );

        localStorageServiceProvider
            .setPrefix( ENV.APP.key )
            .setStorageType( 'localStorage' );
    }
} )();
