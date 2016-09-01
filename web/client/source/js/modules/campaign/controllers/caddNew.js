( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'caddNewController', caddNewController );

    caddNewController.$inject = [ '$scope', '$location', '$http', '$state' ];

    /* @ngInject */
    function caddNewController( $scope, $location, $http, $state ) {
        angular.element( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );
        $scope.currentState = $state.current;

        $scope.submit = function () {
            if ( $scope.adde.requiresMaturity !== true ) $scope.adde.requiresMaturity = false;
            if ( $scope.adde.requiresLocation !== true ) $scope.adde.requiresLocation = false;

            if ( !$scope.add.startDate ) {
                //  $scope.add.startDate = angular.element( '.datepicker' ).val();
                $scope.add.startDate = '2012-04-23T18:25:43.511Z';
            }
            $http.post( '/api/v1/campaign/create', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc1 ) {
                $http.post( '/api/v1/criteria/create', $scope.adde, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } ).then( function ( respSucc2 ) {
                    console.log( respSucc2.data.data.criteria._id );
                    $http.put( '/api/v1/campaign/assigncriteria', {
                        'name': respSucc1.data.data.campaigns.name,
                        'criteriaId': respSucc2.data.data.criteria._id
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    } ).then( function ( respSucc3 ) {
                        console.log( 'facut totu perfect', respSucc3 );
                    }, function ( respErr3 ) {} );
                }, function ( respErr2 ) {} );
            }, function ( respErr1 ) {} );
        };
    }

} )();
