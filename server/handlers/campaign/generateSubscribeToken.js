'use strict';

exports = module.exports = ( CampaignModel, VoterModel, PersonModel, JWT, sendMail ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1/*JWT.verify( h[ 'x-auth-token' ] )*/;
        if ( auth ) {
            var campaign = yield CampaignModel.findById( b.campaignId ).exec(),
                voters = yield VoterModel.find( {} ).exec();
            if ( campaign ) {
                if ( voters ) {
                    for ( var i = 0; i < voters.length; i++ ) {
                        if ( voters[ i ].campaigns.indexOf( {
                                campaignId: b.campaignId
                            } ) ) {
                            var person = yield PersonModel.findById( voters[ i ].personId ).exec(),
                                token = '654das'; //aici trebe generat tokenu
                            if ( person ) {
                                sendMail.sendTokenToVoter( ( person.firstName + ' ' + person.lastName ),
                                    person.email, token, campaign.name );
                            } else {
                                throw ( {
                                    code: 404,
                                    message: 'Person not found!'
                                } );
                            }
                        }
                    }
                    this.success( {
                        campaigns: campaign
                    } );
                } else {
                    throw ( {
                        code: 404,
                        message: 'Voters array not found!'
                    } );
                }
            } else {
                throw ( {
                    code: 404,
                    message: 'Campaign not found!'
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
    'model/voterModel',
    'model/personModel',
    'libs/jwtoken',
    'libs/email'
];
