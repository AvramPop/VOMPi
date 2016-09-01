( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'clistController', clistController );

    clistController.$inject = [ '$scope', '$location', '$http', '$stateParams', '$state' ];

    /* @ngInject */
    function clistController( $scope, $location, $http, $stateParams, $state ) {
        $scope.currentState = $state.current;
        $scope.startalive = function ( name ) {
            $http.put( '/api/v1/campaign/start', {
                'name': name
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'start', respSucc );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'err', respErr );
                return respErr;
            } );
        };

        $scope.finishcamp = function ( name ) {
            $http.put( '/api/v1/campaign/end', {
                'name': name
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'end', respSucc );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'err', respErr );
                return respErr;
            } );
        };

        $http.get( '/api/v1/campaign/list', $scope.add, {
            headers: {
                'Content-Type': 'application/json'
            }
        } ).then( function ( respSucc ) {
            console.log( 'merge pana la request', respSucc );
            $scope.campaigns = respSucc.data.data.campaigns;
            console.log( $scope.campaigns );
            return respSucc;
        }, function ( respErr ) {
            console.log( 'merge pana la request', respErr );
            return respErr;
        } );

        angular.element( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );
    }

} )();
