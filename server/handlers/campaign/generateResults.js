'use strict';

exports = module.exports = ( CampaignModel, CandidateModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield CampaignModel.findById( b.campaignId ).exec();
            var arr = [];
            for ( var i = 0; i < rec.candidates.length; i++ ) {
                var candidate = yield CandidateModel.findById( rec.candidates[ i ] ).exec();
                arr.push( candidate );
            }
            console.log( arr );
            arr.sort( function ( a, b ) {
                if ( a.numberOfVotes < b.numberOfVotes ) {
                    return 1;
                }
                if ( b.numberOfVotes < a.numberOfVotes ) {
                    return -1;
                } else return 0;
            } );
            /*daca is 2 cu acelasi numar de voturi ar trebui sa se intample ceva :) */
            console.log( rec.candidates.toString() );
            yield rec.save();
            this.success( {
                campaigns: rec
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
