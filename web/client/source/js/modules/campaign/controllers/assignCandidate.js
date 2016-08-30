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
            //  console.log( 'merge pana la request 1', respSucc );
            $scope.campaign1 = respSucc.data.data.campaign;
            return respSucc;
        }, function ( respErr ) {
            console.log( 'merge pana la request 2', respErr );
            return respErr;
        } );

        $http.get( '/api/v1/person/list', $scope.add, {
            headers: {
                'Content-Type': 'application/json'
            }
        } ).then( function ( respSucc2 ) {
            console.log( 'merge pana la request3', respSucc2 );
            $scope.p = respSucc2.data.data.persons;
            console.log( $scope.persons );
            return respSucc2;
        }, function ( respErr ) {
            console.log( 'merge pana la request4', respErr );
            return respErr;
        } );

        $scope.submit = function () {
            $http.post( '/api/v1/candidate/create', {
                'personId': '000',
                'type': 'INDEPENDENT'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc3 ) {
                console.log( 'merge pana la request5', respSucc3 );
                $scope.cand = respSucc3.data.data.candidate._id;
                return respSucc3;
            }, function ( respErr ) {
                console.log( 'merge pana la request6', respErr );
                return respErr;
            } );

            $http.put( '/api/v1/campaign/assignCandidate', {
                'campaignId': $scope.campaign1._id,
                'candidateId': $scope.cand
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc4 ) {
                console.log( 'merge pana la request7', respSucc4 );
                return respSucc4;
            }, function ( respErr ) {
                console.log( 'merge pana la request8', respErr );
                return respErr;
            } );

        };

    }

} )();
