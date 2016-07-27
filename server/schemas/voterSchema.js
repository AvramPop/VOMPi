'use strict';
exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        voterSchema = new Schema( {
            personId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Person',
                required: true
            },
            campaigns: [ {
                hasVoted: {
                    type: Boolean
                },
                campaignId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Campaign'
                },
                dateVoted: {
                    type: Date
                }

            } ]
        } );

    return voterSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
