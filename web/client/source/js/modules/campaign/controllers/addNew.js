( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'campaignCtrl', campaignCtrl );

    campaignCtrl.$inject = [ '$scope' ];

    /* @ngInject */
    function campaignCtrl( $scope ) {
        console.log( 'krydsac' );
        $scope.submit = function () {
            var uname = $scope.username;
            var password = $scope.password;
        };
    }

} )();
