// =============================================================================
// DASHBARD ROUTE
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .config( campaignConfig );

    campaignConfig.$inject = [ '$stateProvider' ];

    /* @ngInject */
    function campaignConfig( $stateProvider ) {
        console.log( 'rewrty' );
        $stateProvider
            .state( 'layout.campaignform', {
                url: 'campaignform',
                controller: 'campaignform',
                parent: 'layout',
                templateUrl: 'views/modules/campaign/addNew.html'
            } );
    }
} )();
