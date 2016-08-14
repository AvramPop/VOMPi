'use strict';

exports = module.exports = ( VoterModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield VoterModel.find( {} ).exec();
            if ( rec ) {
                this.success( {
                    voters: rec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'Not any voter!'
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
