'use strict';

let bonafide = require( 'bonafide' );

bonafide.addValidator( 'isPoiArray', 'not array or required fields not present', ( x ) => {
    if ( !( x instanceof Array ) ) {
        return false;
    }
    return x.every( p => p.poiId && p.priority );
} );


