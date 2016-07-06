'use strict';

exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        personSchema = new Schema( {
            name: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            // canVote: {
            //     type: Boolean,
            //     required: true
            // },
            uniqueIdentifier: {
                type: String,
                required: true
            },
            // gender: {
            //     type: String,
            // },
            // dateOfBirth: {
            //     type: Date,
            // },
            // livingArea: {
            //     type: String,
            // }

        } );

    return personSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
