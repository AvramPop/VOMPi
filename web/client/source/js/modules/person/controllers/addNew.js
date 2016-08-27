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

        $http.get( '/api/v1/livingArea/list', $scope.add, {
            headers: {
                'Content-Type': 'application/json'
            }
        } ).then( function ( livingAreas ) {
            console.log( 'merge pana la request', livingAreas );
            return livingAreas;
        }, function ( err ) {
            console.log( 'merge pana la request', err );

            return err;
        } );

        console.log( livingAreas );

        angular.element( 'input.autocomplete' ).autocomplete( {
            data: {
                'Apple': null,
                'Microsoft': null,
                'Google': 'http://placehold.it/250x250'
            }
        } );


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
} )();
