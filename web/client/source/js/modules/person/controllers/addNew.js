( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'addNewPersonController', addNewPersonController );

    addNewPersonController.$inject = [ '$scope', '$location', '$state', '$http' ];

    /* @ngInject */
    function addNewPersonController( $scope, $location, $state, $http ) {
        $scope.currentState = $state.current;
        angular.element( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );

        /*if ( !$scope.add.dateOfBirth ) {
            $scope.add.dateOfBirth = angular.element( '.datepicker' ).val();
        }*/

        $scope.submit = function () {

            $http.post( '/api/v1/livingArea/create', $scope.adda, {
                headers: {
                    'Content-Type': 'application/json'

                }
            } ).then( function ( respSucc2 ) {
                $http.post( '/api/v1/person/create', {
                    'firstName': $scope.firstName,
                    'lastName': $scope.lastName,
                    'uniqueIdentifier': $scope.uniqueIdentifier,
                    'email': $scope.email,
                    'telephone': $scope.telephone,
                    'livingArea': respSucc2.data.data.livingArea._id,
                    'dateOfBirth': '1958-04-23T18:25:43.511Z',
                    'gender': 'male'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } ).then( function ( respSucc1 ) {
                    $state.go( 'layout.listcampaigns' );
                }, function ( respErr1 ) {} );
            }, function ( respErr2 ) {} );
        };
    }
} )();
