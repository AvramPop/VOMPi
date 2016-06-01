'use strict';

let jwt = require( 'jsonwebtoken' );

exports = module.exports = ( settings ) => {
    let methods = {
        sign: signToken,
        verify: verifyToken
    };

    return methods;

    function signToken( data ) {
        return jwt.sign( data, settings.SESSION.secret, {
            expiresIn: settings.SESSION.expire
        } );
    }

    function verifyToken( token ) {
        return jwt.verify( token, settings.SESSION.secret );
    }
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/settings'
];
