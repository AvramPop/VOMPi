( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'achangepassController', achangepassController );

    achangepassController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function achangepassController( $scope, $location, $state, $http ) {
        $scope.currentState = $state.current;
        $scope.submit = function () {
            $http.post( '/api/v1/admin/changepass', $scope.add, {
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
