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
            .state( 'layout.home', {
                url: '^/home',
                parent: 'layout',
                templateUrl: 'views/modules/main/index.html'
            } )
            .state( 'layout.signup', {
                url: '^/signup',
                parent: 'layout',
                templateUrl: 'views/modules/login/signup.html'
            } )
            .state( 'layout.changepass', {
                url: '^/changepass',
                parent: 'layout',
                templateUrl: 'views/modules/login/changepass.html'
            } )
            .state( 'layout.ask', {
                url: '^/ask',
                parent: 'layout',
                templateUrl: 'views/modules/login/ask.html'
            } )
            .state( 'layout.forgotpass', {
                url: '^/forgotpass',
                parent: 'layout',
                templateUrl: 'views/modules/login/forgotpass.html'
            } )
            .state( 'layout.login', {
                url: '^/login',
                parent: 'layout',
                templateUrl: 'views/modules/login/login.html'
            } );
    }
} )();
