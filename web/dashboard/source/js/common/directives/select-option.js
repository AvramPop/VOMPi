( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .directive( 'select', select );

    select.$inject = [ '$document' ];

    /* @ngInject */
    function select( $document ) {
        var directive = {
            restrict: 'E',
            link: linkFunc,
        };

        return directive;

        function linkFunc( scope, elem, attr ) {
            $document.ready( function () {
                elem.material_select();
            } );
        }
    }
} )();
