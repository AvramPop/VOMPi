'use strict';

exports = module.exports = ( CampaignModel, CandidateModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var campaignRec = yield CampaignModel.findById( b.campaignId ).exec(),
                candidateRec = yield CandidateModel.findById( b.candidateId ).exec();
            console.log( 'ads' );
            if ( campaignRec.isCreating /*&& !campaignRec.candidates.indexOf(b.candidateId)*/ ) {
                campaignRec.candidates.push( candidateRec._id );
                console.log( campaignRec.candidates );
                yield campaignRec.save();
            } else {
                console.log( 'The creating period has finihed for campaign: ' +
                    campaignRec.name + ' . You cannot assign candidaes anymore :(' );
            }
            this.success( {
                campaign: campaignRec
            } );
        } else {
            throw ( {
                code: 422,
                message: 'Invalid token'
            } );
        }
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/campaignModel',
    'model/candidateModel',
    'libs/jwtoken'
];
