( function () {
    'use strict';

    angular
        .module( 'app.campaign' )
        .controller( 'campaignCtrl', campaignCtrl );

    campaignCtrl.$inject = [ '$scope' ];

    /* @ngInject */
    function campaignCtrl( $scope ) {
        console.log( 'krydsac' );
        $scope.submit = function () {
            var name = $scope.name;
            var date = $scope.datepicker;
            var duration = $scope.duration;
        };
        $( '.datepicker' ).pickadate( {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        } );
    }

} )();
