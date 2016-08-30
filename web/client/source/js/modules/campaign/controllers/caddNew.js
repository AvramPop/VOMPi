( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'caddNewController', caddNewController );

    caddNewController.$inject = [ '$scope', '$location', '$http' ];

    /* @ngInject */
    function caddNewController( $scope, $location, $http ) {
        angular.element( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );


        $scope.submit = function () {
            if ( $scope.adde.requiresMaturity !== true ) $scope.adde.requiresMaturity = false;
            if ( $scope.adde.requiresLocation !== true ) $scope.adde.requiresLocation = false;

            if ( !$scope.add.startDate ) {
                //  $scope.add.startDate = angular.element( '.datepicker' ).val();
                $scope.add.startDate = '2012-04-23T18:25:43.511Z';
            }
            var namei, idi;
            $http.post( '/api/v1/campaign/create', $scope.add, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc1 ) {
                console.log( 'facut campanie', respSucc1 );
                console.log( respSucc1.data.data.campaigns.name );
                namei = respSucc1.data.data.campaigns.name;
                return respSucc1;
            }, function ( respErr ) {
                console.log( 'err1', respErr );
                return respErr;
            } );

            $http.post( '/api/v1/criteria/create', $scope.adde, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc2 ) {
                console.log( 'facut criteria', respSucc2 );
                console.log( respSucc2.data.data.criteria._id );
                $scope.idi = respSucc2.data.data.criteria._id;
                return respSucc2;
            }, function ( respErr ) {
                console.log( 'err2', respErr );
                return respErr;
            } );

            $http.put( '/api/v1/campaign/assigncriteria', {
                'name': namei,
                'criteriaId': $scope.idi
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( respSucc ) {
                console.log( 'assign criteria', respSucc );
                return respSucc;
            }, function ( respErr ) {
                console.log( 'erre', respErr );
                return respErr;
            } );
        };



    }

} )();
