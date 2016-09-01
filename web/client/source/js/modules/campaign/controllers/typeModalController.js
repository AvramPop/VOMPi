( function () {
    'use strict';
    angular
        .module( 'app.campaign' )
        .controller( 'ModalInstanceCtrl', ModalInstanceCtrlFnc );

    ModalInstanceCtrlFnc.$inject = [ '$scope', '$modalInstance', 'person', '$http', '$state', 'campaign' ];

    function ModalInstanceCtrlFnc( $scope, $modalInstance, person, $http, $state, campaign ) {
        $scope.person = person;
        $scope.campaign1 = campaign;
        $scope.select = function () {
            $http.post( '/api/v1/candidate/create', {
                'personId': person._id,
                'type': $scope.add.party
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc3 ) {
                console.log( 'm11', respSucc3 );
                $http.put( '/api/v1/campaign/assigncandidate', {
                    'campaignId': $scope.campaign1._id,
                    'candidateId': respSucc3.data.data.candidate._id
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
            $modalInstance.close();
        };

        $scope.cancel = function () {

            $modalInstance.dismiss( 'cancel' );
        };
    }

} )();
