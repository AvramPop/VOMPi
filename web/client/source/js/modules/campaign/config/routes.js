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
                url: '^/addnewcampaign',
                parent: 'layout',
                controller: 'caddNewController',
                templateUrl: 'views/modules/campaign/addNew.html'
            } )
            .state( 'layout.alivecampaigndetail', {
                url: '^/alivecampaigndetail',
                parent: 'layout',
                controller: 'caliveController',
                templateUrl: 'views/modules/campaign/alive.html'
            } )
            .state( 'layout.finishedcampaigndetail', {
                url: '^/finishedcampaigndetail',
                controller: 'finishedController',
                parent: 'layout',
                templateUrl: 'views/modules/campaign/finished.html'
            } )
            .state( 'layout.listcampaigns', {
                url: '^/listcampaigns',
                parent: 'layout',
                controller: 'clistController',
                templateUrl: 'views/modules/campaign/list.html'
            } );
    }
} )();
