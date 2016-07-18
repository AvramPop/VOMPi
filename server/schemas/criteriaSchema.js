'use strict';

exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        criteriaSchema = new Schema( {
            campaignId:{
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Campaign'
            }
        } );

    return criteriaSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
