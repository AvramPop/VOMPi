'use strict';

exports = module.exports = ( CandidateModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CandidateModel.findOne( {
                personId: b.personId
            } ).exec();
        console.log( b );
        if ( !rec ) {
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
                code: 404,
                message: 'Candidate already exists'
            } );
        }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/CandidateModel'
];
