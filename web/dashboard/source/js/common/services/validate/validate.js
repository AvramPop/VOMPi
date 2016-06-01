// =============================================================================
// VALIDATE LIBRARY
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .service( 'validate', validateService );

    validateService.$inject = [ '$window' ];

    /* @ngInject */
    function validateService( $window ) {
        var validate = {
            isEmail: isEmailFunc
        };

        return validate;

        function isEmailFunc( value ) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test( value );
        }
    }
} )();
