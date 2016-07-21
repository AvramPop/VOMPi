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
            duration/*hours*/:{
              type: Number,
              required: true
            },
            candidates:{
              type: Array,
              required: true,
              default: []
            },
            numberOfAllowedVoters: {
              type: Number,
              required: true
            },
            isCreating: {
              type: Boolean,
              required: true,
              default: false
            },
            isAlive: {
              type: Boolean,
              required: true,
              default: false
            }
        } );

    return campaignSchema;
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose'
];
