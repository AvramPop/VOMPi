'use strict';

let bonafide = require( 'bonafide' );

bonafide.addValidator( 'isEmail', 'not a valid Email format', ( x ) => {

    if ( ( String( x ) === x ) ) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test( x );
    }
    return false;
} );
