'use strict';

exports = module.exports = ( database, settings, mongoose, campaignSchema ) => {
    let Campaign = mongoose.model( 'Campaign', campaignSchema, 'Campaigns' );
    return Campaign;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/database',
    'libs/settings',
    'libs/mongoose',
    'schemas/campaignSchema'
];
