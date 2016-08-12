'use strict';

exports = module.exports = ( CandidateModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield CandidateModel.findById( b.id ).exec();
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
