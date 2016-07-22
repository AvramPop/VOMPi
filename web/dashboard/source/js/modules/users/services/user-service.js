( function () {
    'use strict';

    angular
        .module( 'app.users' )
        .service( 'UserService', UserServiceFunc );

    UserServiceFunc.$inject = [ 'Restangular' ];

    /* @ngInject */
    function UserServiceFunc( Restangular ) {
        var service = {
            list: listUsersFunc
        };

        return service;

        function listUsersFunc() {
            var URL = Restangular.one( 'user' );
            return URL.customGET().then( function ( resp ) {
                return resp.data.users;
            }, function ( err ) {
                return err.data;
            } );
        }
    }
} )();
