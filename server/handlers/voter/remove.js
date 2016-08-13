'use strict';

exports = module.exports = ( VoterModel, JWT ) => {
    return function* ( id ) {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield VoterModel.findById( id ).exec();
            if ( rec ) {
                yield rec.remove();
                this.success( {
                    voters: rec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'Voter does not exist'
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
    'model/voterModel',
    'libs/jwtoken'
];
