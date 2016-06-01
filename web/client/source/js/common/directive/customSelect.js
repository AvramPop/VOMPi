( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .directive( 'customSelect', customSelect );
    customSelect.$inject = [ '$timeout' ];
    /* @ngInject */
    function customSelect() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'views/common/directive/customSelect.html',
            scope: {
                colors: '='
            },
            link: linkFunc
        };

        return directive;

        function linkFunc( scope, elem, attr ) {
            var input = elem.find( 'input' ),
                ul = elem.find( 'ul' );

            input.bind( 'click', function () {
                ul.css( {
                    display: 'block',
                    opacity: 1
                } );
            } );

            input.blur( function () {
                ul.css( {
                    display: 'none',
                    opacity: 0
                } );
            } );

            scope.selectColor = function ( color ) {
                scope.filterColor = color;
            };

            scope.$watch( 'filterColor', function ( newValue, oldValue ) {
                console.log( newValue );
            } );
        }
    }
} )();
