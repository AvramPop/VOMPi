( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'personCtrl', personCtrl );

    loginCtrl.$inject = [ '$scope', '$location', '$state', '$http' ];

    / @ngInject /
    function personCtrl( $scope, $location, $state, $http ) {

        $scope.submit = function () {
            $http.post( '/api/v1/person/addNew', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                $location.path( '/#/list' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );
                
                return respErr;
            } );
        };
    }
})();