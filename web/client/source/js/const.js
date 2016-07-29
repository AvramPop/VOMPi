( function () {
    'use strict';

    angular
        .module( 'app' )
        .constant( 'ENV', {
            appName: 'voting',
            apiEndPoint: 'http://localhost:8000/v1'
        } );
} )();
