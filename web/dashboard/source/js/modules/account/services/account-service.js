( function () {
    'use strict';

    angular
        .module( 'app.account' )
        .service( 'OAuthService', OAuthService );

    OAuthService.$inject = [ 'Restangular', 'localStorageService' ];

    /* @ngInject */
    function OAuthService( Restangular, localStorageService ) {
        var service = {
            loginInfo: loginInfoFunc,
            signin: signinFunc,
            isLogin: isLoginFunc,
            info: infoFunc
        };

        return service;

        function loginInfoFunc( email ) {
            var URL = Restangular.service( '/oauth/signInfo' ),
                data = {
                    email: email
                };
            return URL.post( data ).then( function ( resp ) {
                return resp.data;
            }, function ( err ) {
                return err.data;
            } );
        }

        function signinFunc( email, password ) {
            var URL = Restangular.service( '/signin/local' ),
                data = {
                    email: email,
                    password: password
                };
            return URL.post( data ).then( function ( resp ) {
                return resp.data;
            }, function ( err ) {
                return err.data;
            } );
        }

        function isLoginFunc() {
            return localStorageService.get( 'token' );
        }

        function infoFunc() {
            //return CryptoJS.decrypt( localStorageService.get( 'user' ), true );
            var URL = Restangular.all( '/oauth/info' );
            return URL.customGET().then( function ( resp ) {
                return resp.data;
            }, function ( err ) {
                return err.data;
            } );
        }
    }
} )();
