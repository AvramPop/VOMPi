(function() {
    'use strict';

    angular
        .module('app')
        .constant('ENV', {
            appName: 'romania360',
            apiEndPoint: 'http://api.romania360.localhost:8000/v1'
        });
})();
