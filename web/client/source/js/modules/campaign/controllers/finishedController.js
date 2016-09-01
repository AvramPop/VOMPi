( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'finishedController', finishedController );

    finishedController.$inject = [ '$scope', '$location', '$http', '$state', '$stateParams', '$rootScope' ];

    /* @ngInject */
    function finishedController( $scope, $location, $http, $state, $stateParams, $rootScope ) {
        $rootScope.currentState = $state.current;

        $http.put( '/api/v1/campaign/generateresults', {
            'name': $stateParams.id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        } ).then( function ( respSucc1 ) {
            $http.post( '/api/v1/campaign/search', {
                'name': $stateParams.id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc2 ) {
                console.log( 'merge' );
                $scope.campaign = respSucc2.data.data.campaign;
                $scope.candidates = respSucc2.data.data.campaign.candidates;
                console.log( $scope.campaign );
            }, function ( respErr2 ) {} );
        }, function ( respErr1 ) {} );

        angular.element( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );
    }

} )();
