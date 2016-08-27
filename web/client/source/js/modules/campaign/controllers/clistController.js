( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'clistController', clistController );

    clistController.$inject = [ '$scope', '$location', '$http' ];

    /* @ngInject */
    function clistController( $scope, $location, $http ) {


        $scope.submit = function () {
            $http.get( '/api/v1/campaign/list', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );
                return respErr;
            } );
        };


        angular.element( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );
    }

} )();
