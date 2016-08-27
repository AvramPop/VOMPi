( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'aloginController', aloginController );

    aloginController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function aloginController( $scope, $location, $state, $http ) {

        $scope.submit = function () {
            $http.post( '/api/v1/admin/login', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                $location.path( '/#/campaignform' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );

                return respErr;
            } );
        };
    }

} )();
