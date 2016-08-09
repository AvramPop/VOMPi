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
<<<<<<< HEAD
            .state('web', {
                abstract: true,
                url: '/',
                controller: 'homeCtrl',
                controllerAs: 'homeVM',
                templateUrl: 'views/common/layout/content.html'
            })
            .state('web.home', {
=======
            .state( 'layout.home', {
>>>>>>> dani
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
