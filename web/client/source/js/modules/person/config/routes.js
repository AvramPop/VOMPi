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
            .state( 'layout.addnewperson', {
                url: '^/addnewperson',
                parent: 'layout',
                controller: 'addNewPersonController',
                templateUrl: 'views/modules/person/addNew.html'
            } )
            .state( 'layout.personsignup', {
                url: '^/personsignup',
                parent: 'layout',
                controller: 'psignupController',
                templateUrl: 'views/modules/login/signup.html'
            } )
            .state( 'layout.personchangepass', {
                url: '^/personchangepass',
                controller: 'pchangepassController',
                parent: 'layout',
                templateUrl: 'views/modules/login/changepass.html'
            } )
            .state( 'layout.personforgotpass', {
                url: '^/personforgotpass',
                controller: 'pforgotpassController',
                parent: 'layout',
                templateUrl: 'views/modules/login/forgotpass.html'
            } )
            .state( 'layout.personlogin', {
                url: '^/personlogin',
                controller: 'ploginController',
                parent: 'layout',
                templateUrl: 'views/modules/login/login.html'
            } );
    }
} )();
