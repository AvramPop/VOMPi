// =============================================================================
// APP CONFIG / SET PAGE ROUTES
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app' )
        .config( Config );

    Config.$inject = [ '$httpProvider', 'RestangularProvider', 'ENV' ];

    /* @ngInject */
    function Config( $httpProvider, RestangularProvider, ENV ) {
        console.info( 'Running CONFIG...' );

<<<<<<< HEAD

        // RestangularProvider.setBaseUrl( ENV.apiEndPoint );
=======
        //  $logProvider.debugEnabled( false );
        //RestangularProvider.setBaseUrl( ENV.apiEndPoint );
>>>>>>> dani
        // $httpProvider.interceptors.push('errorInterceptor');
        // $httpProvider.interceptors.push('resourceInterceptor');
    }
} )();
