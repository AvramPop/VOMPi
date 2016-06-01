( function () {
    'use strict';

    angular
        .module( 'app.common' )
        .directive( 'inputSuggestion', inputSuggestion );

    inputSuggestion.$inject = [ '$document', '_' ];

    /* @ngInject */
    function inputSuggestion( $document, _ ) {
        var directive = {
            restrict: 'AC',
            link: linkFunc
        };

        return directive;

        function linkFunc( scope, elem, attr ) {
            if ( elem.hasClass( 'input-suggestion' ) ) {
                var arrayList = JSON.parse( attr.arrayList ),
                    parentDIV = elem.parent(); // DIV container to append on

                // Check if "data-array-list" isn't empty
                if ( !_.isEmpty( arrayList ) ) {
                    // Create html element
                    var _html = '<ul class="suggestion-content hide">';

                    _.forEach( arrayList, function ( item ) {
                        // If path and class aren't empty
                        // add image to auto complete
                        if ( !_.isEmpty( item.path ) && !_.isEmpty( item.class ) ) {
                            _html += '<li class="suggestion-option">';
                            _html += '<img src="' + item.path + '" class="' + item.class + '">';
                            _html += '<span>' + item.value + '</span>';
                            _html += '</li>';
                        } else { // else create normal element
                            _html += '<li class="suggestion-option">';
                            _html += '<span>' + item.value + '</span>';
                            _html += '</li>';
                        }
                    } );

                    _html += '</ul>';
                    parentDIV.append( _html ); // Set ul in the DIV container body
                    // End create html element

                    // Perform search
                    $document.on( 'keyup', elem, function () {
                        var val = elem.val().trim(),
                            select = parentDIV.find( '.suggestion-content' );

                        // Check if the input isn't empty
                        if ( val !== '' ) {
                            select.children( 'li' ).addClass( 'hide' );
                            select.children( 'li' ).filter( function ( key, option ) {
                                select.removeClass( 'hide' );
                                // Show matching results
                                var li = angular.element( option );
                                return li.text().indexOf( val ) !== -1;
                            } ).removeClass( 'hide' );
                        } else {
                            select.children().addClass( 'hide' );
                        }
                    } );

                    // Set input value
                    var selectedValue = parentDIV.find( '.suggestion-content' ).children( '.suggestion-option' );

                    selectedValue.click( function ( option ) {
                        // Get selected value
                        var textValue = angular.element( option.currentTarget ).text();
                        elem.val( textValue.trim() );
                        // Reset ul status
                        parentDIV.find( '.suggestion-content' ).addClass( 'hide' );
                        parentDIV.find( '.suggestion-content' ).children().removeClass( 'hide' );
                    } );
                    // TODO: Allow arrow keys navigation and get value on press Enter 
                } else {
                    return false;
                }
            }
        }
    }
} )();
