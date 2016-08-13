'use strict';

exports = module.exports = ( CampaignModel, CandidateModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var campaignRec = yield CampaignModel.findById( b.campaignId ).exec(),
                candidateRec = yield CandidateModel.findById( b.candidateId ).exec();
            if ( campaignRec ) {
                if ( candidateRec ) {
                    var k = false;
                    for ( var i = 0; i < campaignRec.candidates.length; i++ ) {
                        if ( campaignRec.candidates[ i ].equals( b.candidateId ) ) {
                            k = true;
                        }
                    }
                    if ( campaignRec.isCreating ) {
                        if ( !k ) {
                            campaignRec.candidates.push( candidateRec._id );
                            console.log( campaignRec.candidates );
                            yield campaignRec.save();
                            this.success( {
                                campaign: campaignRec
                            } );
                        } else {
                            throw ( {
                                code: 404,
                                message: 'candidate already added!'
                            } );
                        }
                    } else {
                        throw ( {
                            code: 404,
                            message: 'The creating period has finihed for campaign: ' +
                                campaignRec.name + ' . You cannot assign candidaes anymore :('
                        } );
                    }
                } else {
                    throw ( {
                        code: 404,
                        message: 'Candidate not found'
                    } );
                }
            } else {
                throw ( {
                    code: 404,
                    message: 'Camapign not found'
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
