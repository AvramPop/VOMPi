( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'finishedController', finishedController );

    finishedController.$inject = [ '$scope', '$location', '$http', '$state', '$stateParams' ];

    /* @ngInject */
    function finishedController( $scope, $location, $http, $state, $stateParams ) {


        $http.post( '/api/v1/campaign/search', {
            'name': $stateParams.id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        } ).then( function ( respSucc ) {
            console.log( 'merge pana la request 1', respSucc );
            $scope.campaign = respSucc.data.data.campaign;
            $scope.candidates = respSucc.data.data.campaign.candidates;
            return respSucc;
        }, function ( respErr ) {
            console.log( 'merge pana la request 2', respErr );
            return respErr;
        } );


        angular.element( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );
    }

} )();
