'use strict';

let IoC = require( 'electrolyte' ),
    http = require( 'http' );

// Dependency injection setup
IoC.use( IoC.dir( './server' ) );

// IoC create neccesary modules
let app = IoC.create( 'app/app' ),
    database = IoC.create( 'libs/database' ),
    settings = IoC.create( 'libs/settings' ),
    echo = IoC.create( 'libs/echo' ),
    // email = IoC.create('libs/email'),
    // cron = IoC.create( 'cron/cron' ),
    server = http.createServer( app.callback() );


// Start server
server.listen( settings.PORT, settings.HOST );

// Print success message in console
// if server starts succesfully
server.on( 'listening', () => {
    console.log( echo.success(
        'Welcome!! Magic it\'s happening on http://' + settings.HOST + ':' + settings.PORT
    ) );
    console.log( echo.info( 'Process PID: ' + process.pid ) );
} );

// If some server error
server.on( 'error', ( e ) => {
    echo.error( e );
    // If EADDRINUSE, try again
    if ( e.code === 'EADDRINUSE' ) {
        console.log( echo.error( 'Address already in use!' ) );
        console.log( echo.warning( '... retrying ...' ) );
        // Retry every settings.TIMEOUT seconds
        setTimeout( () => {
            server.close();
            server.listen( settings.PORT, settings.HOST );
        }, settings.TIMEOUT );
    }
    if ( e.code === 'ECONNRESET' ) {
        console.log( echo.warning( e ) );
    }
} );

// Exit process
process
    .on( 'SIGINT', () => {
        process.exit();
    } )
    .on( 'exit', () => {
        console.log( echo.error( 'Process closed!' ) );
    } );
