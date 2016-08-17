'use strict';

let
    koa = require( 'koa' ),
    cors = require( 'kcors' ),
    send = require( 'koa-send' ),
    mount = require( 'koa-mount' ),
    koa_body = require( 'koa-body' ),
    // Grant = require( 'grant' ).koa(),
    session = require( 'koa-session' ),
    serve = require( 'koa-static-folder' );

// Custom validators
require( '../validators' );

exports = module.exports = ( routes, router, validate, logging, response, settings, FileSystem ) => {
    let app = response( koa() );
    // grant = new Grant( require( './oauth' ) );

    /* Set APP keys */

    app.keys = [ settings.SESSION.secret ];

    routes.forEach( ( r ) => {
        let handler = r.handler,
            // access = ( r.access && r.access instanceof Array ) ? r.access : null,
            needsValidation = r.validate instanceof Array && r.validate.length;

        if ( needsValidation ) {
            // let strict = r.strict === undefined ? true : r.strict;
            handler = validate( r.validate, handler );
        }

        router[ r.method ]( r.path, handler, r.handlerName );
    } );

    /* Create static content folder */

    FileSystem.createPath( settings.PATH.media );

    /* Create static avatar folder */

    FileSystem.createPath( settings.PATH.avatar );

    app
    // .use( serve( './docs/api' ) )
        .use( serve( './web/common' ) )
        .use( serve( './web/client/public' ) )
        .use( serve( './web/dashboard/static' ) )
        .use( serve( './web/dashboard/static/views' ) )
        .use( serve( './' + settings.PATH.media ) )
        .use( cors() )
        .use( function* ( next ) {
            // STATIC WEB PATH
            if ( this.path === '/' ) {
                // WEB CLIENT
                yield send( this, 'web/client/public/index.html' );
            } else if ( this.path === '/dashboard' || this.path === '/dashboard/' ) {
                // DASHBOARD
                yield send( this, 'web/dashboard/static/index.html' );
            } else if ( this.path === '/docs/api' || this.path === '/docs/api/' ) {
                // DASHBOARD
                yield send( this, 'docs/api/index.html' );
            } else {
                // API PATH
                if ( this.path.indexOf( settings.API.root + settings.API.version ) !== -1 ) {
                    this.path = this.path.replace( settings.API.root + settings.API.version, '' );
                    yield next;
                } else {
                    // // Force redirect to web client
                    // // if URL it's not one of the above
                    // this.redirect( '/' );  
                }
            }
        } )
        .use( logging )
        // .use( AuthClient )
        .use( session( app ) )
        .use( koa_body( {
            jsonLimit: settings.JSON.limit,
            multipart: true,
            formidable: {
                uploadDir: settings.PATH.tmp,
                multiples: true
            }
        } ) )
        // .use( mount( grant ) )
        // Verify Access Level
        // .use( ACL( router.routes ) )
        .use( router.demux );

    return app;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'app/routes',
    'middleware/router',
    // 'middleware/access',
    'middleware/validate',
    'middleware/logging',
    'middleware/response',
    // 'middleware/authClient',
    'libs/settings',
    'libs/file-system'
];
