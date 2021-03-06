// =============================================================================
// APP / SET ANGULAR APPLICATION
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app', [
            'ngAnimate',
            'ngResource',
            'ngCookies', // Angular Cookies
            'ui.router', // Angular UI Route
            'restangular', // Rest Angular services
            'ngMaterialize',
            'app.models', // APP MODELS
            'app.common', // APP COMMON
            'app.layout',
            'app.campaign',
            'app.person',
            'app.home' // APP HOME Module
        ] );
} )();
