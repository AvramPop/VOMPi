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
            question: {
                type: String,
                required: true
            },
            isAlive: {
                type: Boolean,
                required: true
            },
            criteria: {
                type: Schema.Types.ObjectId,
                ref: 'Criteria'
            },
            candidates: [ {
                type: Schema.Types.ObjectId,
                ref: 'Candidate',
                required: false
            } ]
        } );

    return campaignSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
