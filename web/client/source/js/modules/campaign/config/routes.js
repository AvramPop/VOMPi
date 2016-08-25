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
                controller: 'campaignCtrl',
                templateUrl: 'views/modules/campaign/addNew.html'
            } )
            .state( 'layout.alive', {
                url: '^/alive',
                parent: 'layout',
                templateUrl: 'views/modules/campaign/alive.html'
            } )
            .state( 'layout.finished', {
                url: '^/finished',
                parent: 'layout',
                templateUrl: 'views/modules/campaign/finished.html'
            } )
            .state( 'layout.list', {
                url: '^/list',
                parent: 'layout',
                controller: 'listController',
                templateUrl: 'views/modules/campaign/list.html'
            } );
    }
} )();
