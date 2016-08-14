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
                url: '^/personform',
                parent: 'layout',
                templateUrl: 'views/modules/person/addNew.html'
            } );
    }
} )();
