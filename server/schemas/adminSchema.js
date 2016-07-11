'use strict';

exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        adminSchema = new Schema( {
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        } );

    return adminSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
