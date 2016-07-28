'use strict';

exports = module.exports = ( VoterModel, CampaignModel ) => {
    return function* ( voterId, campaignId, candidateId ) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield VoterModel.findById( voterId ).exec(),
            campaign = yield CampaignModel.findById( campaignId ).exec(),
            index = campaign.candidates.find( x => x._id === candidateId ),
            d = Date.now();
        if ( d > campaign.startDate && d < ( campaign.startDate + campaign.duration * 3600000 ) &&
            campaign.isAlive && !rec.campaigns[ campaigns.length - 1 ].hasVoted ) {
            campaign.candidates[ index ].numberOfVotes++;
            rec.campaigns[ campaigns.length - 1 ].hasVoted = true;
            rec.campaigns[ campaigns.length - 1 ].dateVoted = Date.now();
            campaign.save();
        }
        rec.hasVoted = true;
        yield rec.save();
        this.success( {
            voters: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/voterModel',
    'model/campaignModel'
];
