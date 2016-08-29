'use strict';

exports = module.exports = ( CandidateModel, PersonModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1/*JWT.verify( h[ 'x-auth-token' ] )*/;
        if ( auth ) {
            var rec = yield PersonModel.findOne( {
                    uniqueIdentifier: b.uniqueIdentifier
                } ).exec(),
                rec2 = yield CandidateModel.findOne( {
                    personId: rec._id
                } );
            if ( rec ) {
                if ( rec2 ) {
                    this.success( {
                        candidate: rec2
                    } );
                } else {
                    throw ( {
                        code: 404,
                        message: 'There is not any candidate for this person'
                    } );
                }
            } else {
                throw ( {
                    code: 404,
                    message: 'There is not any person with this uniqueIdentifier'
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
    'model/personModel',
    'libs/jwtoken'
];
