'use strict';

exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        livingAreaSchema = new Schema( {
            country: {
                type: String,
                required: true
            },
            region /*state/judet*/: {
                type: String,
                required: true
            },
            town: {
                type: String,
                required: true
            },
            street: {
                type: String,
                required: true
            }
            /*,
                        number: {
                            type: String
                        },
                        bloc: {
                            type: String
                        },
                        etaj: {
                            type: String
                        },
                        apartament: {
                            type: String
                        },
                        zipcode: {
                            type: Number
                        }*/

        } );

    return livingAreaSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
