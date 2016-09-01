'use strict';

exports = module.exports = ( CampaignModel, CandidateModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1 /*JWT.verify( h[ 'x-auth-token' ] )*/ ;
        if ( auth ) {
            var rec = yield CampaignModel.findOne( {
                name: b.name
            } ).exec();
            if ( rec ) {
                var arr = [];
                for ( var i = 0; i < rec.candidates.length; i++ ) {
                    var candidate = yield CandidateModel.findById( rec.candidates[ i ] ).exec();
                    if ( candidate ) {
                        arr.push( candidate );
                    } else {
                        throw ( {
                            code: 404,
                            message: 'Candidate not found!'
                        } );
                    }
                }
                arr.sort( function ( a, b ) {
                    return b.numberOfVotes - a.numberOfVotes;
                } );
                /*daca is 2 cu acelasi numar de voturi ar trebui sa se intample ceva :) */
                rec.candidates = arr;
                console.log( rec.candidates );
                yield rec.save();
                this.success( {
                    campaign: rec
                } );
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
    'model/candidateModel',
    'libs/jwtoken'
];
