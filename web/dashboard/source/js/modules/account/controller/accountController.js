// =============================================================================
// ACCOUNT CONTROLLER
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.account' )
        .controller( 'accountCtrl', accountCtrl );

    accountCtrl.$inject = [];

    /* @ngInject */
    function accountCtrl( $scope, $state, moment, ENV ) {
        /* jshint validthis: true */
        var accountVM = this;

        console.log( 'Loading Account Controller...' );
    }
} )();
