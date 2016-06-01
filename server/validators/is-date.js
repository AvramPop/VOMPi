'use strict';

let bonafide = require( 'bonafide' );

bonafide.addValidator( 'isDate', 'not a valid Date format', ( x ) => {
    if ( ( String( x ) === x ) ) {
        try {
            var d = Date( x );
            return !!d; // jshint ignore:line
        } catch ( err ) {
            console.log( err );
            return false;
        }
    }
    return false;
} );
