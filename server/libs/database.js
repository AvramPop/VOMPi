'use strict';

exports = module.exports = ( echo, settings, mongoose ) => {
    let db = mongoose.connect( settings.DB.url ),
        connection = db.connection;

    connection.once( 'connected', () => {
        console.log( echo.debug( '[mongoose] status: ' ) + echo.success( 'ON!' ) );

        connection.on( 'reconnected', () => {
            console.log( echo.debug( '[mongoose] conection: ' ) + echo.warning( 'LOST! Reconnected to mongo' ) );
        } );

        connection.on( 'error', err => {
            console.log( echo.debug( '[mongoose] status: ' ) + echo.error( err.message ) );
        } );

        connection.on( 'disconnected', () => {
            console.log( echo.debug( '[mongoose] status: ' ) + echo.error( 'OFF!' ) );
        } );
    } );

    return db;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/echo',
    'libs/settings',
    'libs/mongoose'
];
