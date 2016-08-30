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

        /*if ( !$scope.add.dateOfBirth ) {
            $scope.add.dateOfBirth = angular.element( '.datepicker' ).val();
        }*/

        $scope.submit = function () {

            $http.post( '/api/v1/livingArea/create', $scope.adda, {
                headers: {
                    'Content-Type': 'application/json'

                }
            } ).then( function ( respSucc1 ) {
                console.log( 'face living area', respSucc1 );
                $state.aid = respSucc1.data.data.livingArea._id;
                return respSucc1;
            }, function ( respErr ) {
                console.log( 'merge pana la request1', respErr );
                return respErr;
            } );
            //      console.log( $scope.add.gender );
            $http.post( '/api/v1/person/create', {
                'firstName': $scope.firstName,
                'lastName': $scope.lastName,
                'uniqueIdentifier': $scope.uniqueIdentifier,
                'email': $scope.email,
                'telephone': $scope.telephone,
                'livingArea': $state.aid,
                'dateOfBirth': '2012-04-23T18:25:43.511Z',
                'gender': 'male'
            }, {
                headers: {
                    'Content-Type': 'application/json'

                }
            } ).then( function ( respSucc ) {
                console.log( 'face om', respSucc );
                $state.go( 'layout.listcampaigns' );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request2', respErr );

                return respErr;
            } );



        };
    }
} )();
