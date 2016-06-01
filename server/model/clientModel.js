'use strict';

let co = require( 'co' );

exports = module.exports = ( database, settings, mongoose, clientSchema ) => {
    let Client = mongoose.model( 'Client', clientSchema, 'Client' );

    Client.check = co.wrap( function* ( item ) {
        let res = yield Client.findOne( {
            client_key: item.client_key,
            client_secret: item.client_secret,
        } ).lean().exec();

        return res ? true : false;
    } );

    return Client;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/database',
    'libs/settings',
    'libs/mongoose',
    'schemas/clientSchema'
];
