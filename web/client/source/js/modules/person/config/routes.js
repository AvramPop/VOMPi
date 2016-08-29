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
                url: '^/person/addnew',
                parent: 'layout',
                controller: 'addNewPersonController',
                templateUrl: 'views/modules/person/addNew.html'
            } )
            .state( 'layout.personsignup', {
                url: '^/person/signup',
                parent: 'layout',
                controller: 'psignupController',
                templateUrl: 'views/modules/login/signup.html'
            } )
            .state( 'layout.personsettings', {
                url: '^/person/settings',
                parent: 'layout',
                controller: 'psettings',
                templateUrl: 'views/modules/person/settings.html'
            } )
            .state( 'layout.personchangepass', {
                url: '^/person/changepass',
                controller: 'pchangepassController',
                parent: 'layout',
                templateUrl: 'views/modules/login/changepass.html'
            } )
            .state( 'layout.personforgotpass', {
                url: '^/person/forgotpass',
                controller: 'pforgotpassController',
                parent: 'layout',
                templateUrl: 'views/modules/login/forgotpass.html'
            } )
            .state( 'layout.personlogin', {
                url: '^/person/login',
                controller: 'ploginController',
                parent: 'layout',
                templateUrl: 'views/modules/login/login.html'
            } );
    }
} )();
