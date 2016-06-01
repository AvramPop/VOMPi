// =============================================================================
// ACCOUNT ROUTE
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.account' )
        .config( accountConfig );

    accountConfig.$inject = [ '$stateProvider' ];

    /* @ngInject */
    function accountConfig( $stateProvider ) {
        $stateProvider
            .state( 'login', {
                url: '/login',
                controller: 'loginCtrl',
                controllerAs: 'loginVM',
                templateUrl: 'views/modules/account/login.html'
            } )
            .state( 'account', {
                url: '^/account',
                parent: 'layout',
                controller: 'accountCtrl',
                controllerAs: 'accountVM',
                templateUrl: 'views/modules/account/account.html'
            } );
    }
} )();
