// =============================================================================
// LOGIN CONTROLLER
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.account' )
        .controller( 'loginCtrl', loginCtrl );

    loginCtrl.$inject = [ '$state', 'OAuthService', 'localStorageService', 'ENV' ];

    /* @ngInject */
    function loginCtrl( $state, OAuthService, localStorageService, ENV ) {
        console.log( 'Running LOGIN Ctrl...' );
        /* jshint validthis: true */
        var loginVM = this,
            defaultName = 'Enter your email and password';

        loginVM.default = {
            name: defaultName,
            avatar: ENV.DEFAULT.defaultAvatar
        };

        loginVM.user = {
            name: defaultName,
            avatar: ENV.DEFAULT.defaultAvatar
        };

        loginVM.setInfo = function ( email ) {
            return OAuthService.loginInfo( email );
        };

        loginVM.signin = function ( email, password ) {
            if ( !email || !password || !loginVM.user.name ) {
                return;
            }
            // password = CryptoJS.encrypt( password, false );
            OAuthService.signin( email, password ).then( function ( resp ) {
                if ( !resp.error ) {
                    var setToken = localStorageService.set( 'token', resp.token );
                    if ( setToken ) {
                        $state.go( 'home' );
                    }
                }
            } );
        };
    }
} )();
