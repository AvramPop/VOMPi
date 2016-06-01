'use strict';

exports = module.exports = ( mongoose ) => {
    let clientSchema = new mongoose.Schema( {
        client_key: String,
        client_secret: String
    }, {
        timestamps: true
    } );

    return clientSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
