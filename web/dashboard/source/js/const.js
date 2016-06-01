( function () {
    'use strict';

    angular
        .module( 'app' )
        .constant( 'ENV', {
            APP: {
                name: 'Romania360',
                key: 'ro360',
                secrect: 'oFLLEE509e90N751hk725Q4Pv182t3rg'
            },
            API: {
                url: 'http://localhost:8000/api/v1'
            },
            SKOBBLER: {
                key: 'e3cb09195ceb914c9b1595f386ce4064'
            },
            DEFAULT: {
                defaultAvatar: 'assets/image/user-default.jpg'
            }
        } );
} )();
