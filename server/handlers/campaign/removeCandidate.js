'use strict';

exports = module.exports = ( CampaignModel, CandidateModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            campaignRec = yield CampaignModel.findById( b.campaignId ).exec();

        var index = campaignRec.candidates.indexOf( b.candidateId );
        console.log( campaignRec + index );
        if ( index > -1 ) {
            campaignRec.candidates.splice( index, 1 );
            yield campaignRec.save();
        }
        this.success( {
            campaign: campaignRec
        } );
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/campaignModel',
    'model/candidateModel'
];
