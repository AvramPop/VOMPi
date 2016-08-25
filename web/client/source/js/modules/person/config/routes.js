// =============================================================================
// DASHBARD ROUTE
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.person' )
        .config( personConfig );

    personConfig.$inject = [ '$stateProvider' ];

    /* @ngInject */
    function personConfig( $stateProvider ) {
        $stateProvider
            .state( 'layout.personform', {
                url: '^/addperson',
                parent: 'layout',
                templateUrl: 'views/modules/person/addNew.html'
            } )
            .state( 'layout.personsignup', {
                url: '^/personsignup',
                parent: 'layout',
                templateUrl: 'views/modules/login/signup.html'
            } )
            .state( 'layout.personchangepass', {
                url: '^/personchangepass',
                parent: 'layout',
                templateUrl: 'views/modules/login/changepass.html'
            } )
            .state( 'layout.personforgotpass', {
                url: '^/personforgotpass',
                parent: 'layout',
                templateUrl: 'views/modules/login/forgotpass.html'
            } )
            .state( 'layout.personlogin', {
                url: '^/personlogin',
                parent: 'layout',
                templateUrl: 'views/modules/login/login.html'
            } );
    }
} )();
