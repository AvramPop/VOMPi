'use strict';

exports = module.exports = ( VoterModel, PersonModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield PersonModel.findOne( {
                    uniqueIdentifier: b.uniqueIdentifier
                } ).exec(),
                rec2 = yield VoterModel.findOne( {
                    personId: rec._id
                } );
            this.success( {
                voters: rec2
            } );
            // this.success({ user: 'ceva' });
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
    'model/personModel',
    'libs/jwtoken'
];
