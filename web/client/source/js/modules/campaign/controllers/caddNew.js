( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'caddNewController', caddNewController );

    caddNewController.$inject = [ '$scope', '$location', '$http' ];

    /* @ngInject */
    function caddNewController( $scope, $location, $http ) {


        $scope.submit = function () {
            if ( !$scope.add.startDate ) {
                $scope.add.startDate = angular.element( '.datepicker' ).val();
                console.log( 'krydsac', $scope.add );
            }

            function fetch() {
                $http.post( '/api/v1/campaign/create', $scope.add, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } ).then( function ( respSucc ) {
                    console.log( 'facut campanie', respSucc );
                    //  $location.path( '/#/list' );
                    return respSucc;
                }, function ( respErr ) {
                    console.log( 'err1', respErr );
                    return respErr;
                } );

                $http.post( '/api/v1/criteria/create', $scope.add, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } ).then( function ( respSucc ) {
                    console.log( 'facut criteria', respSucc );
                    return respSucc;
                }, function ( respErr ) {
                    console.log( 'err2', respErr );
                    return respErr;
                } );
            }
        };


        angular.element( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );
    }

} )();
