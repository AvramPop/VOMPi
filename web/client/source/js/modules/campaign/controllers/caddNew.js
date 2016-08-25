( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'campaignCtrl', campaignCtrl );

    campaignCtrl.$inject = [ '$scope', '$http' ];

    /* @ngInject */
    function campaignCtrl( $scope, $http ) {


        $scope.submit = function () {
            if ( !$scope.add.startDate ) {
                $scope.add.startDate = angular.element( '.datepicker' ).val();
                console.log( 'krydsac', $scope.add );
            }
            $http.post( '/api/v1/campaign/create', $scope.add, {
                headers: {
                    'x-auth-token': 'dsfgthgdfhd'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request', respSucc );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );
                return respErr;
            } );
            $
        };


        angular.element( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );
    }

} )();
