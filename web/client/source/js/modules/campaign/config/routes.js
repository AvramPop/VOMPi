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
            .state( 'layout.addnewcampaign', {
                url: '^/campaign/addnew',
                parent: 'layout',
                controller: 'caddNewController',
                templateUrl: 'views/modules/campaign/addNew.html'
            } )
            .state( 'layout.alivecampaigndetail', {
                url: '^/campaign/alivedetail',
                parent: 'layout',
                controller: 'caliveController',
                templateUrl: 'views/modules/campaign/alive.html'
            } )
            .state( 'layout.finishedcampaigndetail', {
                url: '^/campaign/finisheddetail',
                controller: 'finishedController',
                parent: 'layout',
                templateUrl: 'views/modules/campaign/finished.html'
            } )
            .state( 'layout.listcampaigns', {
                url: '^/campaign/list',
                parent: 'layout',
                controller: 'clistController',
                templateUrl: 'views/modules/campaign/list.html'
            } );
    }
} )();
