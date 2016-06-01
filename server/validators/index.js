'use strict';

require( 'fs' ).readdirSync( __dirname ).forEach( ( file ) => {
    if ( file !== 'index.js' ) {
        require( './' + file.replace( '.js', '' ) );
    }
} );
