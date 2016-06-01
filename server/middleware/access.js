'use strict';

exports = module.exports = ( router, Utils, JWT, settings ) => {
    return ( routes ) => {
        return function* ( next ) {
            let ctx = this,
                method = this.request.method.toLowerCase(),
                cRoute = routes[ method ].find( r => r.handlerName === router.set( ctx ).handler ),
                user = null;

            if ( cRoute.access ) {
                if ( !this.header[ 'x-user-token' ] ) {
                    throw ( {
                        code: 401,
                        message: 'Missing user token!'
                    } );
                } else {
                    try {
                        let token = this.header[ 'x-user-token' ];
                        user = JWT.verify( token );
                    } catch ( e ) {
                        throw ( {
                            code: e.code || 422,
                            message: e.message
                        } );
                    }
                }
            }

            if ( user ) {
                let roleList = new Set( cRoute.access ),
                    grantAccess = ( roleList.has( user.role.type ) );
                if ( grantAccess ) {
                    yield next;
                } else {
                    throw ( {
                        code: 403,
                        message: 'Unauthorized! You don\'t have the necessary permissions for this resource'
                    } );
                }
            }

            yield next;
        };
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'middleware/router',
    'libs/utils',
    'libs/jwtoken',
    'libs/settings'
];
