'use strict';

exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        adminSchema = new Schema( {
            email: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            isAlive: {
                type: Boolean,
                required: true,
                default: 'false'
            }
        } );

    return adminSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
