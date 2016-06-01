// =============================================================================
// APP ROUTER / SET PAGE ROUTES
// =============================================================================

(function() {
    'use strict';

    angular
        .module('app')
        .config(Routes);

    Routes.$inject = ['$stateProvider', '$urlRouterProvider',];

    /* @ngInject */
    function Routes($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /home
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('404', {
                url: '/404',
                templateUrl: 'views/error/404.html'
            });
    }
})();
