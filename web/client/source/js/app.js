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
<<<<<<< HEAD
            'app.home', // APP HOME Module
            'app.campaigns',
=======
            'app.layout',
            'app.campaign',
            'app.home' // APP HOME Module
>>>>>>> dani
        ] );
} )();
