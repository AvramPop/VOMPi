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
        $stateProvider
            .state( 'layout.campaignform', {
                url: '^/campaignform',
                parent: 'layout',
                templateUrl: 'views/modules/campaign/addNew.html'
            } )
            .state( 'layout.sidebar', {
                url: '^/sidebar',
                parent: 'layout',
                templateUrl: 'views/modules/campaign/sidebar.html'
            } )
            .state( 'layout.list', {
                url: '^/list',
                parent: 'layout',
                templateUrl: 'views/modules/campaign/list.html'
            } );
    }
} )();
