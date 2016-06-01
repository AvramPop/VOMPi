// =============================================================================
// DASHBOARD ROUTE
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.dashboard' )
        .config( homeConfig );

    homeConfig.$inject = [ '$stateProvider' ];

    /* @ngInject */
    function homeConfig( $stateProvider ) {
        $stateProvider
            .state( 'home', {
                url: '^/home',
                parent: 'layout',
                controller: 'dashboardCtrl',
                controllerAs: 'dashVM',
                templateUrl: 'views/modules/home/home.html'
            } );
    }
} )();
