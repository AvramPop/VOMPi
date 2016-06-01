'use strict';

exports = module.exports = ( settings, Client ) => {
    let special = {
            'POST': [
                '/import/user'
            ]
        },
        isSpecial = request => {
            let paths = special[ request.method ] || [],
                currentPath = request.path.replace( settings.API.root + settings.API.version, '' );
            if ( paths && paths.indexOf( currentPath ) !== -1 || paths.find( path => {
                    return currentPath.match( path.replace( /:\w+/g, '\\w+' ) );
                } ) ) {
                return true;
            }
            return false;
        };

    return function* ( next ) {
        if ( isSpecial( this.request ) ) {
            try {
                let h = this.request.header,
                    clientId = h[ 'x-client-id' ],
                    clientToken = h[ 'x-client-token' ],
                    client = yield Client.check( {
                        client_key: clientId,
                        client_secret: clientToken
                    } );
                if ( client ) {
                    this.state = this.state || {};
                    this.state[ 'client' ] = client;
                    yield next;
                } else {
                    throw ( {
                        code: 401,
                        message: 'Auth error!. Invalid Client/Token provided'
                    } );
                }
            } catch ( err ) {
                if ( err.code || err.statusCode ) {
                    throw ( {
                        code: err.code || err.statusCode,
                        message: err.message
                    } );
                } else {
                    throw ( {
                        code: 400,
                        message: err.message
                    } );
                }
            }
        } else {
            yield next;
        }
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/settings',
    'model/clientModel'
];
