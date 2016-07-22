// =============================================================================
// MATERIALIZE TOAST
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .service( 'Materialize', materialize );

    materialize.$inject = [ '$window' ];

    /* @ngInject */
    function materialize( $window ) {
        return $window.Materialize;
    }
} )();
