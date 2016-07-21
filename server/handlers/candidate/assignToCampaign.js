'use strict';

exports = module.exports = ( CandidateModel ) => {
    return function* (id, campaignId) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CandidateModel.findById( {_id: id} ).exec(),
            campaign = yield CampaignModel.findById({_id: campaignId}).exec();
            if(campaign.isCreating){
              campaign.candidates.push(rec);
              campaign.save;
            }
        this.success( {
            candidates: rec,
            campaigns: campaign
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/candidateModel'
];
