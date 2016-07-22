// =============================================================================
// SETTING UDERSCORE JAVASRIPT LIBRARY
// =============================================================================

(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('moment', momentjs);

    momentjs.$inject = ['$window'];

    /* @ngInject */
    function momentjs($window) {
        // assumes moment has already been loaded on the page
        return $window.moment;
    }
})();
