( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'aforgotpassController', aforgotpassController );

    aforgotpassController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function aforgotpassController( $scope, $location, $state, $http ) {

        $scope.submit = function () {
            $http.post( '/api/v1/admin/forgotpass', $scope.add, {
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
