'use strict';

exports = module.exports = ( CampaignModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CampaignModel.findById( b.id ).exec();
        rec.isCreating = false;
        rec.isAlive = true;
        //aici se fac joburile si/sau se pune timer pt durata in ORE!!!
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
