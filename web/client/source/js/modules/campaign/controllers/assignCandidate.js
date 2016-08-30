( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'assignCandidate', assignCandidate );

    assignCandidate.$inject = [ '$scope', '$location', '$http', '$stateParams' ];

    /* @ngInject */
    function assignCandidate( $scope, $location, $http, $stateParams ) {

        $http.post( '/api/v1/campaign/search', {
            'name': $stateParams.id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        } ).then( function ( respSucc ) {
            console.log( 'merge pana la request 1', respSucc );
            $scope.campaign = respSucc.data.data.campaign;
            return respSucc;
        }, function ( respErr ) {
            console.log( 'merge pana la request 2', respErr );
            return respErr;
        } );

        $http.get( '/api/v1/person/list', $scope.add, {
            headers: {
                'Content-Type': 'application/json'
            }
        } ).then( function ( respSucc ) {
            console.log( 'merge pana la request3', respSucc );
            $scope.persons = respSucc.data.data.persons;
            return respSucc;
        }, function ( respErr ) {
            console.log( 'merge pana la request4', respErr );
            return respErr;
        } );

        angular.element( 'input.autocomplete' ).autocomplete( {
            data: $scope.persons.firstName
        } );

        $scope.assign = function () {
            $http.post( '/api/v1/candidate/create', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request5', respSucc );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request6', respErr );
                return respErr;
            } );

            $http.put( '/api/v1/campaign/assignCandidate', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'merge pana la request7', respSucc );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'merge pana la request8', respErr );
                return respErr;
            } );
        };
    }

} )();
