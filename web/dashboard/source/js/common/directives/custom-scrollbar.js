/*=============================================>>>>>
= SCROLL BAR DIRECTIVE =
===============================================>>>>>*/
( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .directive( 'customScrollbar', customScrollbarFunc );

    customScrollbarFunc.$inject = [ '$window', '$timeout' ];

    /* @ngInject */
    function customScrollbarFunc( $window, $timeout ) {
        var directive = {
            restrict: 'AC',
            link: linkFunc
        };

        return directive;

        function linkFunc( scope, elem, attr ) {
            var axis = attr.customScrollbarAxis,
                theme = attr.customScrollbarTheme,
                list = angular.element(
                    elem[ 0 ].querySelector( '.' + attr.customScrollbarList )
                );

            /**
             *
             * If vertical scroll,
             * set Container Width
             *
             */
            if ( axis === 'x' ) {
                list.css( {
                    width: list[ 0 ].innerWidth
                } );
            }

            /**
             *
             * If horizontal scroll,
             * set Container Height
             *
             */
            if ( axis === 'y' ) {
                list.css( {
                    height: ( list[ 0 ].clientHeight + 20 )
                } );
            }

            /*----------- Apply Direcive -----------*/

            $timeout( function () {
                elem.mCustomScrollbar( {
                    /**
                     *
                     * The type of scrollbars added to the element:
                     * vertical and/of horizontal)
                     *
                     */
                    axis: axis,
                    /**
                     *
                     * Set the scrollbar theme
                     *
                     */
                    theme: theme || 'minimal',
                    /**
                     *
                     * Enable or disable auto-hiding
                     * the scrollbar when inactive
                     *
                     */
                    autoHideScrollbar: false,
                    /**
                     *
                     * position of scrollbar in relation to content
                     *
                     */
                    scrollbarPosition: 'outside',
                    /**
                     *
                     * Amount of scrolling momentum as
                     * animation duration in milliseconds
                     *
                     */
                    scrollInertia: 0
                } );

                elem.on( 'mouseenter', function () {
                    var draggerContainer = elem.find( '.mCSB_draggerContainer' );
                    draggerContainer.css( 'display', 'block' );
                } );

                elem.on( 'mouseleave', function () {
                    var draggerContainer = elem.find( '.mCSB_draggerContainer' );
                    draggerContainer.css( 'display', 'none' );
                } );
            }, 0, false );
        }
    }
} )();
