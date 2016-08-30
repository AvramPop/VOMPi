( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'asignupController', asignupController );

    asignupController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function asignupController( $scope, $location, $state, $http ) {

        $scope.submit = function () {
            $http.post( '/api/v1/admin/create', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'mere', respSucc );
                $state.go( 'layout.adminlogin' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );
                $state.go( 'layout.adminlogin' );
                return respErr;
            } );
        };
    }

} )();
