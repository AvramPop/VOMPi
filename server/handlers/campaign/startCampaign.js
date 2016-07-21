'use strict';

exports = module.exports = ( CampaignModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CampaignModel.findOne( {
                name: b.name
            } ).exec();
        rec.isAlive = true;
        rec.save();
        this.success( {
            activated: true
        } );
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/campaignModel'
];
