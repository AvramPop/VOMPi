'use strict';

exports = module.exports = ( CampaignModel, VoterModel, PersonModel, JWT, sendMail ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var campaign = yield CampaignModel.findById( b.campaignId ).exec(),
                voters = yield VoterModel.find( {} ).exec();
            for ( var i = 0; i < voters.length; i++ ) {
                if ( voters[ i ].campaigns.indexOf( {
                        campaignId: b.campaignId
                    } ) ) {
                    var person = yield PersonModel.findById( voters[ i ].personId ).exec(),
                        token = '654das'; //aici trebe generat tokenu
                    sendMail.sendTokenToVoter( ( person.firstName + ' ' + person.lastName ),
                        person.email, token, campaign.name );
                }
            }
            this.success( {
                campaigns: campaign
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
    'model/voterModel',
    'model/personModel',
    'libs/jwtoken',
    'libs/email'
];
