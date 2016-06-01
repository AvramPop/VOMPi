// =============================================================================
// LAYOUT MODULE CONTROLLER
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.layout' )
        .controller( 'layoutCtrl', layoutCtrl );

    layoutCtrl.$inject = [ 'ENV', '$scope', '$state', 'OAuthService', '_' ];

    /* @ngInject */
    function layoutCtrl( ENV, $scope, $state, OAuthService, _ ) {
        /* jshint validthis: true */
        var layoutVM = this;

        layoutVM.user = {};
        layoutVM.config = {
            state: $state.current.name,
            siteName: ENV.APP.name
        };

        OAuthService.info().then( function ( resp ) {
            layoutVM.user = resp.user;
            console.log( layoutVM.user );
            if ( _.isEmpty( layoutVM.user.avatar ) ) {
                layoutVM.user.avatar = ENV.DEFAULT.defaultAvatar;
            }
        } );

        console.log( 'Loading Layout Controller...' );
    }
} )();
