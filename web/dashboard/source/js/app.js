// =============================================================================
// APP / SET ANGULAR APPLICATION
// =============================================================================

( function() {
    'use strict';

    angular
        .module( 'app', [
            'ngAnimate',
            'ngResource',
            'ngCookies', // Angular Cookies
            'ui.router', // Angular UI Route
            'restangular', // Rest Angular services
            'app.home',
            'app.festival', // APP FESTIVAL Module
            'app.program', // APP PROGRAM Module
            'app.accommodation', // APP ACCOMMODATION Module
            'app.tickets', // APP TICKETS Module
            'app.news', // APP NEWS Module
            'app.media', // APP MEDIA Module
            'app.info', // APP INFO Module
            'app.common', // APP COMMON
            'app.layout' // APP LAYOUT
        ] );
} )();
