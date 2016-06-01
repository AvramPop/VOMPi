( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .directive( 'tooltip', tooltip );

    tooltip.$inject = [ '$document' ];

    /* @ngInject */
    function tooltip( $document ) {
        var directive = {
            restrict: 'AC',
            link: linkFunc,
        };

        return directive;

        function linkFunc( scope, elem, attr ) {
            $document.ready( function () {
                elem.tooltip();
            } );
        }
    }
} )();
