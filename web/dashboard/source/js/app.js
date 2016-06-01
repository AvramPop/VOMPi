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
            'ngMaterialize',
            'ui.router', // Angular UI Route
            'restangular', // Rest Angular services
            'LocalStorageModule', // Angular Local Storage
            'app.common', // APP COMMON
            'app.layout', // APP LAYOUT
            'app.dashboard', // APP HOME Module
            'app.account', // APP ACCOUNT Module
        ] );
} )();
