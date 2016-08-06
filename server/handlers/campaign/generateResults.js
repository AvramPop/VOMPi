'use strict';

exports = module.exports = ( CampaignModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield CampaignModel.findById( b.campaignId ).exec();
            rec.candidates.sort( function ( a, b ) {
                if ( a.numberOfVotes > b.numberOfVotes ) {
                    return 1;
                }
                if ( b.numberOfVotes > a.numberOfVotes ) {
                    return -1;
                } else return 0;
            } );
            /*asta nu ar trebui sa se intample, daca is 2 cu acelasi numar de voturi ar trebui sa se intample ceva :) */
            console.log( rec.candidates.toString() );
            yield rec.save();
            this.success( {
                campaigns: rec
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
    'model/campaignModel',
    'model/candidateModel',
    'libs/jwtoken'
];
