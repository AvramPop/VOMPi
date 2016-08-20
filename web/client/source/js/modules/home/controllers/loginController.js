( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'loginCtrl', loginCtrl );

    loginCtrl.$inject = [ '$scope', '$http' ];

    /* @ngInject */
    function loginCtrl( $scope, $http ) {
        $scope.submit = function () {
            $http.post( '/api/v1/person/loginparams' ).then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );
                return respErr;
            } );
            $
        };
    }

} )();
