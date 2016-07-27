// =============================================================================
// USERS ROUTE
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.users' )
        .config( usersConfig );

    usersConfig.$inject = [ '$stateProvider' ];

    /* @ngInject */
    function usersConfig( $stateProvider ) {
        $stateProvider
            .state( 'users', {
                url: '^/users',
                parent: 'layout',
                controller: 'usersCtrl',
                controllerAs: 'usersVM',
                templateUrl: 'views/modules/users/users.html',
                resolve: {
                    Data: [ '$stateParams', 'UserService', function ( $stateParams, UserService ) {
                        return UserService.list();
                    } ]
                }
            } );
    }
} )();
