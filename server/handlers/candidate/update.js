//type
'use strict';

exports = module.exports = ( CandidateModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CandidateModel.findById( b.id ).exec();
        console.log( b );
        if ( rec ) {
            rec.type = b.type;
            yield rec.save();
            this.success( {
                candidates: rec
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Candidate does not exist'
            } );
        }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/candidateModel'
];
