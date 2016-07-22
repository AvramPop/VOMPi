'use strict';
exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        voterSchema = new Schema( {
            personId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Person',
                required: true
            },
            campaigns: {
                type: Array,
                required: true,
                any: [
                    /*
                                    hasVoted
                                    dateVoted
                                    campaignId
                                    criteriaId
                                    */
                ]
            }
        } );

    return voterSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
