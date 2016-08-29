( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'pforgotpassController', pforgotpassController );

    pforgotpassController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function pforgotpassController( $scope, $location, $state, $http ) {

        $scope.submit = function () {
            $http.post( '/api/v1/person/forgotpass', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                $location.path( '/#/personlogin' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );

                return respErr;
            } );
        };
    }

} )();
