( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'assignCandidate', assignCandidate );

    assignCandidate.$inject = [ '$scope', '$location', '$http', '$stateParams', '$state', '$modal' ];

    /* @ngInject */
    function assignCandidate( $scope, $location, $http, $stateParams, $state, $modal ) {
        $scope.currentState = $state.current;
        var items = [ 1, 2, 3 ];
        $scope.openModal = function ( $event, person ) {
            var modalInstance = $modal.open( {
                templateUrl: 'views/modules/campaign/typeModal.html',
                anchorElement: $event ? angular.element( $event.target ) : undefined,
                controller: 'ModalInstanceCtrl',
                resolve: {
                    person: function () {
                        return person;
                    },
                    campaign: function () {
                        return $scope.campaign1;
                    }
                }
            } );
            modalInstance.result.then( function ( selectedItem ) {
                $scope.modalResult = 'You selected ' + selectedItem;
                $state.reload();
            }, function () {
                $scope.modalResult = 'You dismissed the modal';
            } );
        };
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
            $scope.campaign1 = respSucc.data.data.campaign;
            $scope.candidates = respSucc.data.data.campaign.candidates;
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

    }

} )();
