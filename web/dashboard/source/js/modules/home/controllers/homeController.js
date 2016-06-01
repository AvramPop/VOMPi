// =============================================================================
// HOME CONTROLLER
// =============================================================================

( function() {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'homeCtrl', homeCtrl );

    homeCtrl.$inject = [ '$scope', '$state', 'moment', 'ENV' ];

    /* @ngInject */
    function homeCtrl( $scope, $state, moment, ENV ) {
        /* jshint validthis: true */
        var homeVM = this;

        console.log( 'Loading Home Controller...' );
    }
} )();
