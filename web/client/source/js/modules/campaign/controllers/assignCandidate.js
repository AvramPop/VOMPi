( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'assignCandidate', assignCandidate );

    assignCandidate.$inject = [ '$scope', '$location', '$http' ];

    /* @ngInject */
    function assignCandidate( $scope, $location, $http ) {
        angular.element( 'input.autocomplete' ).autocomplete( {
            data: {
                'Apple': null,
                'Microsoft': null,
                'Google': 'http://placehold.it/250x250'
            }
        } );

        $http.get( '/api/v1/person/list', $scope.add, {
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

        $scope.assign = function () {
            $http.post( '/api/v1/candidate/create', $scope.add, {
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

            $http.put( '/api/v1/campaign/assignCandidate', $scope.add, {
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
    }

} )();
