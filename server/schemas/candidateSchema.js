'use strict';

exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        candidateSchema = new Schema( {
            type: {
                type: String,
                required: true
            },
            personId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Person',
                required: true
            },
            /*  optionals: {
                  type: Schema.Types.Mixed,
                  required: false
              },*/
            numberOfVotes: {
                type: Number,
                required: true
            }

        } );

    return candidateSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
