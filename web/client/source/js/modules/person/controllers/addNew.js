( function () {
    'use strict';

    angular
        .module( 'app.person' )
        .controller( 'personCtrl', personCtrl );

    personCtrl.$inject = [ '$scope' ];

    /* @ngInject */
    function personCtrl( $scope ) {
        console.log( 'krydsac' );
        $scope.submit = function () {
            var name = $scope.name;
            var date = $scope.datepicker;
            var duration = $scope.duration;
        };

    }

} )();
