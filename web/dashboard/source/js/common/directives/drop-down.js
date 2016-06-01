( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .directive( 'dropDown', dropDown );

    dropDown.$inject = [ '$document' ];

    /* @ngInject */
    function dropDown( $document ) {
        var directive = {
            restrict: 'AC',
            link: linkFunc,
        };

        return directive;

        function linkFunc( scope, elem, attr ) {
            $document.ready( function () {
                elem.dropdown( {
                    inDuration: 300,
                    outDuration: 225,
                    constrain_width: false,
                    hover: false,
                    gutter: 0,
                    belowOrigin: true,
                    alignment: attr.alignment
                } );
            } );
        }
    }
} )();
