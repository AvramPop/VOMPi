'use strict';

exports = module.exports = ( CampaignModel, CandidateModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            validate = JWT.verify( h[ 'access-token' ] );
        console.log( validate );
        if ( validate ) {
            let campaignRec = yield CampaignModel.findById( b.campaignId ).exec(),
                candidateRec = yield CandidateModel.findById( b.candidateId ).exec();
            console.log( 'ads' );
            if ( campaignRec.isCreating ) {
                campaignRec.candidates.push( candidateRec );
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
                code: 401,
                message: {
                    en: 'Invalid user credentials!',
                }
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
