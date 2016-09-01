( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'aloginController', aloginController );

    aloginController.$inject = [ '$scope', '$location', '$state', '$http', '$sce', '$cookies' ];

    /* @ngInject */
    function aloginController( $scope, $location, $state, $http, $sce, $cookies ) {
        $scope.showError = false;
        $scope.currentState = $state.current;
        $scope.submit = function () {
            $http.post( '/api/v1/admin/login', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                //$cookies.put( 'numeUtilizator', respSucc.data.data.admin.username );
                $state.go( 'layout.listcampaigns' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );
                $scope.showError = true;
            } );
        };
    }

} )();
