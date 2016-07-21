'use strict';

exports = module.exports = ( VoterModel ) => {
    return function* (id, campaignId, candidate) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield VoterModel.findById( {
              _id: id
            } ).exec(),
            campaign = yield CampaignModel.findById({
              _id: campaignId;
            }).exec(),
            index = campaign.candidates.indexOf(candidate),
            d = Date.now();
            if(d > campaign.startDate && d < (campaign.startDate + duration * 3600000) && campaign.isAlive) {
              campaign.candidates[index].numberOfVotes++;
              campaign.save();
            }
            //ar trebui sa fie o proprietate de genu si numa daca ii false sa poti vota
            /*rec.hasVoted = true;
            rec.save();*/
        this.success( {
            voters: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'model/campaignModel'
];
