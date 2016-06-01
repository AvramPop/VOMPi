// =============================================================================
// APP RUN
// =============================================================================

(function() {
    'use strict';

    angular
        .module('app')
        .run(Run);

    Run.$inject = [];

    /* @ngInject */
    function Run() {
        console.info('Running RUN...');
    }
})();
