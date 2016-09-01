// =============================================================================
// LAYOUT MODULE CONTROLLER
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.layout' )
        .controller( 'layoutCtrl', layoutCtrl );

    layoutCtrl.$inject = [ '$scope', '$state', '$cookies', '$rootScope' ];

    /* @ngInject */
    function layoutCtrl( $scope, $state, $cookies, $rootScope ) {
        console.log( 'Loading Layout Controller...' );

        /* jshint validthis: true */
        var vm = this;
        $rootScope.currentState = $state.current;
        $scope.currentState = $rootScope.currentState;
        $state.uname = $cookies.get( 'numeUtilizator' );
        angular.element( '#logo-container' ).sideNav();
        angular.element( '.button-collapse' ).sideNav();
        // vm.config = {
        //     state: $state.current.name,
        //     siteName: ENV.APP.name
        // };
        //
        // vm.user = User;
        //
        // if ( _.isEmpty( vm.user.avatar ) ) {
        //     vm.user.avatar = ENV.DEFAULT.avatar;
        // }

        // vm.language = {
        //     availables: ENV.LANGS,
        //     selected: ENV.LANGS.find( function ( lang ) {
        //         return lang.value === ENV.APP.lang;
        //     } )
        // };

        // vm.setLang = function ( langKey ) {
        //     vm.language.selected = vm.language.availables.find( function ( lang ) {
        //         return lang.value === langKey;
        //     } );
        //     $translate.use( langKey );
        // };

        // vm.logout = function () {
        //     var removeToken = localStorageService.set( 'token' );
        //     if ( removeToken ) {
        //         $state.go( 'home', {}, {
        //             reload: true
        //         } );
        //     }
        // };
    }
} )();
