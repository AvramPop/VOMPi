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
                url: '^/adminlogin',
                parent: 'layout',
                templateUrl: 'views/modules/admin/login.html'
            } )
            .state( 'layout.adminforgotpass', {
                url: '^/adminforgotpass',
                parent: 'layout',
                templateUrl: 'views/modules/admin/forgotpass.html'
            } )
            .state( 'layout.adminchangepass', {
                url: '^/adminchangepass',
                parent: 'layout',
                templateUrl: 'views/modules/admin/changepass.html'
            } )
            .state( 'layout.adminsignup', {
                url: '^/adminsignup',
                parent: 'layout',
                templateUrl: 'views/modules/admin/signup.html'
            } );
    }
} )();
