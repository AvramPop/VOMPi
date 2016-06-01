'use strict';

let IoC = require( 'electrolyte' ),
    fs = require( 'fs' );

let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
    ARGUMENT_NAMES = /([^\s,]+)/g;

let getParamNames = ( func ) => {
        let fnStr = func.toString().replace( STRIP_COMMENTS, '' ),
            result = fnStr.slice(
                fnStr.indexOf( '(' ) + 1,
                fnStr.indexOf( ')' )
            ).match( ARGUMENT_NAMES );

        if ( result === null ) {
            return [];
        }

        return result;
    },
    apiMapping = ( routes ) => {
        return function* () {
            let resp = routes.map( ( r ) => {
                let name = ( r.method + r.path )
                    .split( /[\/:]/ )
                    .map( ( p, i ) => {
                        if ( i ) {
                            if ( p ) {
                                return p.charAt( 0 ).toUpperCase() + p.slice( 1 );
                            } else {
                                return 'By';
                            }
                        } else {
                            return p;
                        }
                    } )
                    .join( '' );
                return {
                    name: name,
                    method: r.method,
                    path: r.path,
                    access: r.access
                };
            } );
            this.success( resp );
        };
    };

exports = module.exports = () => {
    let routes = JSON.parse( fs.readFileSync( './server/app/routes.json' ) ),
        routeMap = routes.slice();

    routes.forEach( ( r ) => {
        let handler = IoC.create( r.handler ),
            params = getParamNames( handler );

        r.handlerName = r.handler;
        r.handler = handler;

        if ( r.validate instanceof Array ) {
            r.validate.forEach( ( v ) => {
                v.index = params.indexOf( v.param );
                v.validators.forEach( ( f, i ) => {
                    if ( String( f ) === f ) {
                        v.validators.splice( i, 1, {
                            name: f
                        } );
                    }
                } );
            } );
        }
    } );

    routes.push( {
        method: 'get',
        path: '/capabilities',
        handler: apiMapping( routeMap ),
        requireAccount: false,
        validate: [],
        handlerName: '/capabilities'
    } );

    return routes;
};

exports[ '@singleton' ] = true;
