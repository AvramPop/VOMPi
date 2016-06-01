// =============================================================================
// DASHBARD ROUTE
// =============================================================================

(function() {
    'use strict';

    angular
        .module('app.home')
        .config(homeConfig);

    homeConfig.$inject = ['$stateProvider'];

    /* @ngInject */
    function homeConfig($stateProvider) {
        $stateProvider
            .state('web', {
                abstract: true,
                url: '/web',
                controller: 'homeCtrl',
                controllerAs: 'homeVM',
                templateUrl: 'views/common/layout/content.html'
            })
            .state('web.home', {
                url: '^/home',
                parent: 'web',
                templateUrl: 'views/modules/home/home.html'
            });
    }
})();
