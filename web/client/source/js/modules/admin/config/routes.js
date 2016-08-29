// =============================================================================
// DASHBARD ROUTE
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .config( homeConfig );

    homeConfig.$inject = [ '$stateProvider' ];

    /* @ngInject */
    function homeConfig( $stateProvider ) {
        $stateProvider
            .state( 'layout.adminlogin', {
                url: '^/admin/login',
                controller: 'aloginController',
                parent: 'layout',
                templateUrl: 'views/modules/admin/login.html'
            } )
            .state( 'layout.adminforgotpass', {
                url: '^/admin/forgotpass',
                controller: 'aforgotpassController',
                parent: 'layout',
                templateUrl: 'views/modules/admin/forgotpass.html'
            } )
            .state( 'layout.adminchangepass', {
                url: '^/admin/changepass',
                controller: 'achangepassController',
                parent: 'layout',
                templateUrl: 'views/modules/admin/changepass.html'
            } )
            .state( 'layout.adminsignup', {
                url: '^/admin/signup',
                controller: 'asignupController',
                parent: 'layout',
                templateUrl: 'views/modules/admin/signup.html'
            } );
    }
} )();
