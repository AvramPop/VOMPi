// =============================================================================
// DASHBOARD CONTROLLER
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.home' )
        .controller( 'homeCtrl', homeCtrl );

    homeCtrl.$inject = [ '$scope', '$state', 'moment', 'ENV' ];

    /* @ngInject */
    function homeCtrl( $scope, $state, moment, ENV ) {
        console.log( 'home' );
        /* jshint validthis: true */
        var homeVM = this;
        homeVM.slider = [{
            url:'https://untold.com/assets/img/Bg.jpg',
        },{
            url:'https://untold.com/assets/img/Bg.jpg',
        },{
            url:'https://untold.com/assets/img/Bg.jpg',
        },{
            url:'https://untold.com/assets/img/Bg.jpg',
        },{
            url:'https://untold.com/assets/img/Bg.jpg',
        }
    ];
        homeVM.config = {
            state: $state.current.name,
            siteName: ENV.appName,
            copyRight: moment().format( 'YYYY' )
        };

        homeVM.colors = [ {
            value: 1,
            name: 'yellow'
        }, {
            value: 2,
            name: 'red'
        }, {
            value: 3,
            name: 'black'
        }, {
            value: 4,
            name: 'blue'
        } ];

        activate();

        function activate() {
            console.log( homeVM );
        }
    }
} )();
