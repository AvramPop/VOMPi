'use strict';

exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        personSchema = new Schema( {
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            uniqueIdentifier: {
                type: String,
                required: true
            },
            gender: {
                type: String,
            },
            dateOfBirth: {
                type: Date,
                required: true
            },
            livingArea: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Living Area',
                required: true
            },
            telephone: {
                type: String
            },
            isActivated: {
                type: Boolean
            },
            password: {
                type: String
            }
        } );

    return personSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
