// =============================================================================
// UNDERSCORE JAVASRIPT LIBRARY
// =============================================================================

(function() {
    'use strict';

    angular
        .module('app.common')
        .service('_', lodashService);

    lodashService.$inject = ['$window'];

    /* @ngInject */
    function lodashService($window) {
        // assumes underscore has already been loaded on the page
        return $window._;
    }
})();
