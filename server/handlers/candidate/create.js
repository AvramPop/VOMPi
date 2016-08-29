'use strict';

exports = module.exports = ( CandidateModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1/*JWT.verify( h[ 'x-auth-token' ] )*/;
        if ( auth ) {
            let newCandidate = new CandidateModel( {
                type: b.type,
                personId: b.personId,
                numberOfVotes: 0
            } );
            console.log( newCandidate );
            yield newCandidate.save();
            this.success( {
                candidate: newCandidate
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
    'model/candidateModel',
    'libs/jwtoken'
];
