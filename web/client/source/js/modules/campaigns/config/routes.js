// =============================================================================
// DASHBARD ROUTE
// =============================================================================

(function() {
    'use strict';

    angular
        .module('app.campaigns')
        .config(campaignConfig);

    campaignConfig.$inject = ['$stateProvider'];

    /* @ngInject */
    function campaignConfig($stateProvider) {
        $stateProvider
            // .state('campaign', {
            //     abstract: true,
            //     url: '/',
            //     controller: 'homeCtrl',
            //     controllerAs: 'homeVM',
            //     templateUrl: 'views/common/layout/content.html'
            // })
            // .state('campaign.home', {
            //     url: '/home',
            //     parent: 'web',
            //     templateUrl: 'views/modules/home/home.html'
            // })
            // .state('campaign.login', {
            //     url: '/login',
            //     parent: 'web',
            //     templateUrl: 'views/modules/login/login.html'
            // });
    }
})();
