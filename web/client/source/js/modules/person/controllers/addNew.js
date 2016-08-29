( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'addNewPersonController', addNewPersonController );

    addNewPersonController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function addNewPersonController( $scope, $location, $state, $http ) {

        angular.element( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );

        $scope.submit = function () {
            $http.post( '/api/v1/person/create', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'

                }
            } ).then( function ( respSucc ) {
                console.log( 'face om', respSucc );
                $http.post( '/api/v1/livingArea/create', $scope.add, {
                    headers: {
                        'Content-Type': 'application/json'

                    }
                } ).then( function ( respSucc ) {
                    console.log( 'face living area', respSucc );
                    //person.livingArea = livingArea._id; cumva facut sa mearga
                    return respSucc;
                }, function ( respErr ) {
                    console.log( 'merge pana la request', respErr );

                    return respErr;
                } );
                $location.path( '/#/list' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request', respErr );

                return respErr;
            } );
        };
    }
} )();
