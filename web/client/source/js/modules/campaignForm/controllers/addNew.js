( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'campaignForm', campaignForm );

    campaignForm.$inject = [ '$scope' ];

    /* @ngInject */
    function campaignForm( $scope ) {
        console.log( 'krydsac' );
        $scope.submit = function () {
            return 'safdas';
            // var uname = $scope.username;
            // var password = $scope.password;
        };
    }

} )();
