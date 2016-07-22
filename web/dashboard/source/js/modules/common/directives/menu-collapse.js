// =============================================================================
// COLLAPSE MENU DIRECTIVE
// =============================================================================

( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .directive( 'menuCollapse', buttonCollapse );

    buttonCollapse.$inject = [ '$window', '$document' ];

    /* @ngInject */
    function buttonCollapse( $window, $document ) {
        var directive = {
            restrict: 'C',
            link: linkFunc
        };

        return directive;

        function linkFunc( scope, elem, attr ) {
            elem.sideNav( {
                menuWidth: 240, // Default is 240
                edge: attr.edge, // Choose the horizontal origin
                closeOnClick: attr.closeOnClick // Closes side-nav on <a> clicks, useful for Angular/Meteor
            } );
        }
    }
} )();
