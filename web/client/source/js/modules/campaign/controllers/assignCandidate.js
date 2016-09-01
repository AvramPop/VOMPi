( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'assignCandidate', assignCandidate );

    assignCandidate.$inject = [ '$scope', '$location', '$http', '$stateParams', '$state' ];

    /* @ngInject */
    function assignCandidate( $scope, $location, $http, $stateParams, $state ) {
        $scope.currentState = $state.current;
        $scope.cont = function ( uid ) {
            for ( var i = 0; i < $scope.candidates.length; i++ ) {
                if ( $scope.candidates[ i ].personId.uniqueIdentifier === uid ) return false;
            }
            return true;
        };
        $http.post( '/api/v1/campaign/search', {
            'name': $stateParams.id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        } ).then( function ( respSucc ) {
            //  console.log( 'merge pana la request 1', respSucc );
            $scope.campaign1 = respSucc.data.data.campaign;
            $scope.candidates = respSucc.data.data.campaign.candidates;
            // console.log( $scope.candidates );
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
            $scope.persons = respSucc2.data.data.persons;
            console.log( $scope.persons );
            return respSucc2;
        }, function ( respErr ) {
            console.log( 'merge pana la request4', respErr );
            return respErr;
        } );

        $scope.assign = function ( id ) {
            angular.element( '#modal1' ).openModal();
            $http.post( '/api/v1/candidate/create', {
                'personId': id,
                'type': $scope.addy.party
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc3 ) {
                console.log( 'm11', respSucc3 );
                $scope.cand = respSucc3.data.data.candidate._id;
                $http.put( '/api/v1/campaign/assigncandidate', {
                    'campaignId': $scope.campaign1._id,
                    'candidateId': $scope.cand
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } ).then( function ( respSucc4 ) {
                    console.log( '22', respSucc4 );
                    var candId = respSucc4.data.data.campaign.candidates;
                    $http.get( '/api/v1/candidate/list', {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    } ).then( function ( succ ) {
                        $scope.candidates = succ.data.data.candidates.filter( function ( cand ) {
                            console.log( !!candId.indexOf( cand._id ) );
                            return !!candId.indexOf( cand._id );
                        } );
                        $state.reload();
                    } );
                    return respSucc4;
                }, function ( respErr ) {
                    console.log( 'merge pana la request8', respErr );
                    return respErr;
                } );
            }, function ( respErr ) {
                console.log( 'merge pana la request6', respErr );
                return respErr;
            } );



        };

    }

} )();
