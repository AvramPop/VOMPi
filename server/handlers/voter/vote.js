'use strict';

let _ = require( 'underscore' );

exports = module.exports = ( VoterModel, CampaignModel, CandidateModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1 /*JWT.verify( h[ 'x-auth-token' ] )*/ ;
        if ( auth ) {
            var voter = yield VoterModel.findById( b.voterId ).exec(),
                campaign = yield CampaignModel.findById( b.campaignId ).exec(),
                candidate = yield CandidateModel.findById( b.candidateId ).exec(),
                d = Date.now();
            if ( voter ) {
                if ( campaign ) {
                    if ( candidate ) {
                        var a = false;
                        var k = false;
                        var idi1, idi2 = b.campaignId;
                        for ( var j = 0; j < voter.campaigns.length; j++ ) {
                            idi1 = voter.campaigns[ j ].campaignId;
                            if ( idi1 === idi2 && !voter.campaigns[ j ].hasVoted ) {
                                k = true;
                            }
                        }
                        console.log( k );
                        for ( var i = 0; i < campaign.candidates.length; i++ ) {
                            if ( campaign.candidates[ i ].equals( b.candidateId ) ) {
                                a = true;
                            }
                        }
                        if ( 1 /*a*/ ) {
                            if ( 1 /*campaign.isAlive*/
                                /*&& d > campaign.startDate
                                && d < ( campaign.startDate + campaign.duration * 3600000 )*/
                            ) {
                                if ( 1 /*k*/ ) {
                                    if ( 1 /*&& verificat token/uri sa fie valide pt campania asta*/ ) {
                                        candidate.numberOfVotes++;
                                        voter.campaigns[ voter.campaigns.length - 1 ] = {
                                            hasVoted: true,
                                            dateVoted: Date.now()
                                        };
                                        yield voter.save();
                                        yield candidate.save();
                                        this.success( {
                                            candidate: candidate
                                        } );
                                    } else {
                                        throw ( {
                                            code: 422,
                                            message: 'the inserted token is not ok!'
                                        } );
                                    }
                                } else {
                                    throw ( {
                                        code: 422,
                                        message: 'voter has already voted!'
                                    } );
                                }
                            } else {
                                throw ( {
                                    code: 422,
                                    message: 'the campaign is no longer alive!'
                                } );
                            }
                        } else {
                            throw ( {
                                code: 422,
                                message: 'the chosen candidate is not a part of the campaign!'
                            } );
                        }
                    } else {
                        throw ( {
                            code: 404,
                            message: 'Candidate does not exist'
                        } );
                    }
                } else {
                    throw ( {
                        code: 404,
                        message: 'Campaign does not exist'
                    } );
                }
            } else {
                throw ( {
                    code: 404,
                    message: 'Voter does not exist'
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
    'model/voterModel',
    'model/campaignModel',
    'model/candidateModel',
    'libs/jwtoken'
];
