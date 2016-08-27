( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'asignupController', asignupController );

    asignupController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function asignupController( $scope, $location, $state, $http ) {

        $scope.submit = function () {
            $http.put( '/api/v1/admin/signup', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                $location.path( '/#/adminlogin' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );

                return respErr;
            } );
        };
    }

} )();
