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
            .state( 'layout.main', {
                url: '^/main',
                parent: 'layout',
                templateUrl: 'views/modules/main/index.html',
                style: 'views/modules/main/min/custom-min.css'
            } )
            .state( 'layout.login', {
                url: '^/login',
                parent: 'layout',
                templateUrl: 'views/modules/login/login.html'
            } );
    }
} )();
