// =============================================================================
// DASHBARD ROUTE
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .config( homeConfig );

    homeConfig.$inject = [ '$stateProvider' ];

    /* @ngInject */
    function homeConfig( $stateProvider ) {
        $stateProvider
            .state( 'layout.home', {
                url: '^/home',
                parent: 'layout',
                templateUrl: 'views/modules/home/home.html'
            } )
            .state( 'layout.login', {
                url: '^/login',
                parent: 'layout',
                templateUrl: 'views/modules/login/login.html'
            } );
    }
} )();
