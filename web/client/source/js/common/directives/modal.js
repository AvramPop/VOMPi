( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .directive( 'modalTrigger', modal );

    modal.$inject = [ '$document' ];

    /* @ngInject */
    function modal( $document ) {
        var directive = {
            restrict: 'AC',
            link: linkFunc,
        };

        return directive;

        function linkFunc( scope, elem, attr ) {

            $document.ready( function () {
                elem.leanModal();
            } );
        }
    }
} )();
