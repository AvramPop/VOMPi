'use strict';

let _ = require( 'underscore' );

exports = module.exports = ( VoterModel, CampaignModel, CandidateModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var voter = yield VoterModel.findById( b.voterId ).exec(),
                campaign = yield CampaignModel.findById( b.campaignId ).exec(),
                candidate = yield CandidateModel.findById( b.candidateId ).exec(),
                d = Date.now();
            console.log( candidate._id );
            console.log( campaign.candidates[ 0 ] );
            console.log( campaign.candidates[ 0 ] === b.candidateId );
            console.log( _.contains( campaign.candidates, candidate._id ) );
            if ( 1 //campaign.candidates.indexOf( candidate._id ) // so the candidate is part of campaign
                /* && d > campaign.startDate && d < ( campaign.startDate + campaign.duration * 3600000 ) &&
                           campaign.isAlive && !voter.campaigns[ voter.campaigns.length - 1 ].hasVoted*/
                //&& verificat token/uri sa fie valide pt campania asta
            ) {
                //console.log( voter + '\n' + campaign + '\n' + candidate );
                candidate.numberOfVotes++;
                voter.campaigns[ voter.campaigns.length - 1 ] = {
                    hasVoted: true,
                    dateVoted: Date.now()
                };
                yield voter.save();
                yield candidate.save();
            }
            this.success( {
                voters: voter
            } );
            // this.success({ user: 'ceva' });
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
