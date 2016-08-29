'use strict';

exports = module.exports = ( CandidateModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1/*JWT.verify( h[ 'x-auth-token' ] )*/;
        if ( auth ) {
            var rec = yield CandidateModel.find( {} ).exec();
            if ( rec ) {
                this.success( {
                    candidates: rec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'Not any candidate!'
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
