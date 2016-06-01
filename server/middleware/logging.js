'use strict';

let _ = require( 'lodash' ),
    clc = require( 'cli-color' );

exports = module.exports = () => {
    return function* ( next ) {
        let error = null;

        try {
            yield next;
        } catch ( err ) {
            if ( !_.isEmpty( err ) ) {
                error = err;
            }
            this.fail( parseInt( err.code || err.statusCode ) || 422, err );
        }

        let ctx = this,
            res = this.res,
            onfinish = done.bind( null, 'finish' ),
            onclose = done.bind( null, 'close' );

        res.once( 'finish', onfinish );
        res.once( 'close', onclose );

        function done( event ) {
            res.removeListener( 'finish', onfinish );
            res.removeListener( 'close', onclose );
            log( ctx, res, error );
        }

        function log( ctx, res, err ) {
            let colorCodes = {
                    5: 'redBright',
                    4: 'redBright',
                    3: 'yellowBright',
                    2: 'greenBright',
                    1: 'greenBright'
                },
                // Get the status code of the response
                status = err ? ( err.status || 500 ) : ( ctx.status || 404 ),
                // Set the color of the status code;
                s = status / 100 | 0, // jshint ignore:line
                echo = ( s > 3 ) ? clc[ colorCodes[ s ] ].bold : clc[ colorCodes[ s ] ],
                // If error, get the error message
                message = ' [' + res.statusMessage + ( ( err ) ? ': ' + err.message : '' ) + '] ';

            console.log(
                echo( '[' + ctx.method + '] ' ) +
                clc.cyan( ctx.url ) +
                clc.blackBright( ' --> ' ) +
                echo( res.statusCode + message )
            );
        }
    };
};

exports[ '@singleton' ] = true;
