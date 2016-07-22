( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .directive( 'tabs', tabs );

    tabs.$inject = [ '$document' ];

    /* @ngInject */
    function tabs( $document ) {
        var directive = {
            restrict: 'AC',
            link: linkFunc,
        };

        return directive;

        function linkFunc( scope, elem, attr ) {
            $document.ready( function () {
                elem.tabs();
            } );
        }
    }
} )();
