/*=============================================>>>>>
= LOGIN CONTROLLER =
===============================================>>>>>*/

( function () {
    'use strict';

    angular
        .module( 'app.account' )
        .controller( 'loginCtrl', loginCtrl );

    loginCtrl.$inject = [ '$scope', '$state', '$timeout',
        'OAuthService', 'localStorageService', 'ENV'
    ];

    /* @ngInject */
    function loginCtrl( $scope, $state, $timeout,
        OAuthService, localStorageService, ENV ) {
        console.log( 'Running LOGIN Ctrl...' );

        var defaultName,
            /* jshint validthis: true */
            vm = this;
        // 
        // vm.language = {
        //     availables: ENV.LANGS,
        //     selected: ENV.LANGS.find( function ( lang ) {
        //         return lang.value === ENV.APP.lang;
        //     } )
        // };
        //
        // vm.setLang = function ( langKey ) {
        //     vm.language.selected = vm.language.availables.find( function ( lang ) {
        //         return lang.value === langKey;
        //     } );
        //     $translate.use( langKey );
        // };

        vm.default = {
            name: defaultName,
            avatar: ENV.DEFAULT.avatar,
            lang: ENV.APP.lang,
        };

        vm.user = {
            name: defaultName,
            avatar: ENV.DEFAULT.avatar
        };

        vm.setInfo = function ( email ) {
            return OAuthService.loginInfo( email );
        };

        vm.signin = function ( email, password ) {
            if ( !email || !password || !vm.user.name ) {
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
