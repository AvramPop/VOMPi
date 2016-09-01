( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'caliveController', caliveController );

    caliveController.$inject = [ '$scope', '$location', '$http', '$stateParams', '$state' ];

    /* @ngInject */
    function caliveController( $scope, $location, $http, $stateParams, $state ) {
        $scope.currentState = $state.current;
        $http.post( '/api/v1/campaign/search', {
            'name': $stateParams.id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        } ).then( function ( respSucc ) {
            $scope.campaign = respSucc.data.data.campaign;
            $scope.candidates = respSucc.data.data.campaign.candidates;
            return respSucc;
        }, function ( respErr ) {
            console.log( 'merge pana la request 2', respErr );
            return respErr;
        } );

        $scope.submit = function ( uid ) {
            $http.post( '/api/v1/candidate/search', {
                'uniqueIdentifier': uid
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc1 ) {

                $http.post( '/api/v1/voter/create', {
                    'personId': respSucc1.data.data.candidate.personId
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } ).then( function ( respSucc2 ) {
                    console.log( 'face voter' );
                    $http.put( '/api/v1/voter/vote', {
                        'voterId': respSucc2.data.data.voter._id,
                        'campaignId': $scope.campaign._id,
                        'candidateId': respSucc1.data.data.candidate._id
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    } ).then( function ( respSucc3 ) {
                        console.log( 'so votat', respSucc3 );
                    }, function ( respErr3 ) {} );
                }, function ( respErr2 ) {
                    console.log( 'cauta voter' );
                    $http.post( '/api/v1/voter/search', {
                        'uniqueIdentifier': uid
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    } ).then( function ( respSucc5 ) {
                        $http.put( '/api/v1/voter/vote', {
                            'voterId': respSucc5.data.data.voter._id,
                            'campaignId': $scope.campaign._id,
                            'candidateId': respSucc1.data.data.candidate._id
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        } ).then( function ( respSucc3 ) {
                            console.log( 'so votat', respSucc3 );
                        }, function ( respErr3 ) {} );
                    }, function ( respErr5 ) {} );
                } );
            }, function ( respErr1 ) {} );


        };
    }

} )();
