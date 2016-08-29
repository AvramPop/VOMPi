( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'ploginController', ploginController );

    ploginController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function ploginController( $scope, $location, $state, $http ) {

        $scope.submit = function () {
            $http.post( '/api/v1/person/login', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request 1', respSucc );
                $state.go( 'layout.listcampaigns' );
                // $location.url( '/#/listcampaigns' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );

                return respErr;
            } );
        };
    }

} )();
