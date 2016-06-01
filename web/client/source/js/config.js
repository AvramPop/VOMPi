// =============================================================================
// APP CONFIG / SET PAGE ROUTES
// =============================================================================

(function() {
    'use strict';

    angular
        .module('app')
        .config(Config);

    Config.$inject = ['$httpProvider', '$logProvider', 'RestangularProvider', 'ENV'];

    /* @ngInject */
    function Config($httpProvider, $logProvider, RestangularProvider, ENV) {
        console.info('Running CONFIG...');

        $logProvider.debugEnabled(false);
        RestangularProvider.setBaseUrl(ENV.apiEndPoint);
        // $httpProvider.interceptors.push('errorInterceptor');
        // $httpProvider.interceptors.push('resourceInterceptor');
    }
})();
