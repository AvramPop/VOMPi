// =============================================================================
// LAYOUT MODULE ROUTE (Start Route)
// =============================================================================
( function () {
    'use strict';

    angular
        .module( 'app.layout' )
        .config( layoutConfig );

    layoutConfig.$inject = [ '$stateProvider' ];

    function layoutConfig( $stateProvider ) {
        console.log( 'fdaad' );
        $stateProvider
            .state( 'layout', {
                url: '/',
                abstract: true,
                controller: 'layoutCtrl',
                controllerAs: 'vm',
                templateUrl: 'views/common/layout/layout.html'
            } );
    }
} )();
