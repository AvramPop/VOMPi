// =============================================================================
// APP / SET ANGULAR APPLICATION
// =============================================================================

(function() {
    'use strict';

    angular
        .module('app', [
            'ngAnimate',
            'ngResource',
            'ngCookies',            // Angular Cookies
            'ui.router',            // Angular UI Route
            'restangular',          // Rest Angular services
            'leaflet-directive',    // Leaflet Angular Directive
            'app.models',           // APP MODELS
            'app.common',           // APP COMMON
            'app.home'              // APP HOME Module
        ]);
})();
