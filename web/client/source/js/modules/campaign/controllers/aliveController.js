( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'caliveController', caliveController );

    caliveController.$inject = [ '$scope', '$location', '$http', '$stateParams' ];

    /* @ngInject */
    function caliveController( $scope, $location, $http, $stateParams ) {
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

        /*  $scope.submit = function () {
              $http.get( '/api/v1/voter/vote', {
                  'voterId': 'asta trebuie sa se stie din sesiune',
                  'campaignId': $scope.campaign._id,
                  'candidateId': luat din click
              }, {
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
          */
    }

} )();
