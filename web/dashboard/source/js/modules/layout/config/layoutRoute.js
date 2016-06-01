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
        $stateProvider
            .state( 'layout', {
                abstract: true,
                controller: 'layoutCtrl',
                controllerAs: 'layoutVM',
                templateUrl: 'views/common/layout/layout.html'
            } );
    }
} )();
