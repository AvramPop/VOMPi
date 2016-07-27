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
                controllerAs: 'vm',
                templateUrl: 'views/common/layout/layout.html',
                resolve: {
                    User: [ 'OAuthService', function ( OAuthService ) {
                        return OAuthService.info().then( function ( resp ) {
                            return resp.user;
                        } );
                    } ]
                }
            } );
    }
} )();
