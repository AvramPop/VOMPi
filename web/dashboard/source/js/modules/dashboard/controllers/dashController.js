// =============================================================================
// DASHBOARD CONTROLLER
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.dashboard' )
        .controller( 'dashboardCtrl', homeCtrl );

    homeCtrl.$inject = [];

    /* @ngInject */
    function homeCtrl( $scope, $state, moment, ENV ) {
        /* jshint validthis: true */
        var dashVM = this;

        console.log( 'Loading Dashboard Controller...' );
    }
} )();
