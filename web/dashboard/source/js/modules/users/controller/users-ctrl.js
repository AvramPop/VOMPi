// =============================================================================
// USERS CONTROLLER
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.users' )
        .controller( 'usersCtrl', usersCtrl );

    usersCtrl.$inject = [ '$scope', 'Data' ];

    /* @ngInject */
    function usersCtrl( $scope, Data ) {
        /* jshint validthis: true */
        var usersVM = this;

        $scope.activeUser = {
            copy: null,
            index: -1
        };

        console.log( 'Loading Users Controller...' );

        usersVM.list = Data;

        $scope.setActiveUser = function ( userIndex ) {
            $scope.activeUser.copy = angular.copy( usersVM.list[ userIndex ] );
            $scope.activeUser.index = userIndex;
        };

        $scope.saveActiveUser = function () {
            usersVM.list[ $scope.activeUser.index ] = $scope.activeUser.copy;
        };

        console.log( Data );
    }
} )();
