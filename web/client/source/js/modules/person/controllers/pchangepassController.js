( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'pchangepassController', pchangepassController );

    pchangepassController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function pchangepassController( $scope, $location, $state, $http ) {

        $scope.submit = function () {
            $http.put( '/api/v1/person/changepass', $scope.add, {
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
