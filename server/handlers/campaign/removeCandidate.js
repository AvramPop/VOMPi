'use strict';

exports = module.exports = ( CampaignModel, CandidateModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1/*JWT.verify( h[ 'x-auth-token' ] )*/;
        if ( auth ) {
            var campaignRec = yield CampaignModel.findById( b.campaignId ).exec();

            var index = campaignRec.candidates.indexOf( b.candidateId );
            if ( index > -1 ) {
                campaignRec.candidates.splice( index, 1 );
                yield campaignRec.save();
                this.success( {
                    campaigns: campaignRec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'There is no candidate to remove with this id'
                } );
            }

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
