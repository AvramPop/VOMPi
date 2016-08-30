( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'psignupController', psignupController );

    psignupController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function psignupController( $scope, $location, $state, $http ) {

        $scope.submit = function () {
            $http.post( '/api/v1/person/signup', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                $state.go( 'layout.personsignup' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );

                return respErr;
            } );
        };
    }

} )();
