'use strict';

exports = module.exports = ( CampaignModel ) => {
    return function* (id) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CampaignModel.findById( {
             _id: id
            } ).remove().exec();
        this.success( {
            campaigns: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/campaignModel'
];
