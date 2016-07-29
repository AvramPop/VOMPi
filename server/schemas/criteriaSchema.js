'use strict';

exports = module.exports = ( mongoose ) => {
    let Schema = mongoose.Schema,
        criteriaSchema = new Schema( {
            requiresMaturity: {
                type: Boolean,
                required: true
            },
            requiresLocation: {
                type: Boolean,
                required: true
            },
            locationRequired: [ {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'LivingArea'
            } ]
        } );

    return criteriaSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
