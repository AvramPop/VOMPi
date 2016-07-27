'use strict';

exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        campaignSchema = new Schema( {
            name: {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            duration: { //hours
                type: Number,
                required: true
            },
            isCreating: {
                type: Boolean,
                required: true
            },
            isAlive: {
                type: Boolean,
                required: true
            },
            candidates: [ { //asta credca se poate mai simplut
                candidates: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Candidate'
                }
            } ]
        } );

    return campaignSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
