'use strict';

let fs = require( 'fs' ),
    path = require( 'path' );

exports = module.exports = () => {
    let services = {
        ifExists: ifExistsFunc,
        createPath: createPathFunc
    };

    return services;

    /**
     *
     * Verify if path/file exists 
     *
     */
    function ifExistsFunc( path ) {
        try {
            let stat = fs.statSync( path );
            return stat.isFile() || stat.isDirectory();
        } catch ( err ) {
            return false;
        }
    }

    /**
     *
     * Create a new path
     *
     */
    function createPathFunc( newPath ) {
        if ( !services.ifExists( newPath ) ) {
            fs.mkdirSync( newPath );
        }
    }
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [

];
