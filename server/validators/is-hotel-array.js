'use strict';

let bonafide = require( 'bonafide' );

bonafide.addValidator( 'isHotelArray', 'not Hotel Array', ( x ) => {
    if ( !( x instanceof Array ) ) {
        return false;
    }
    return x.every( h => h[ 'name' ] && h.stars && h.city && h[ 'location' ] && h[ 'location' ].lat && h[ 'location' ].lng && h.startDate && h.endDate ); // jshint ignore:line
} );
