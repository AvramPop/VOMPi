'use strict';

exports = module.exports = ( VoterModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield VoterModel.findOne( {
                personId: b.personId
            } ).exec();
            console.log( b );
            if ( !rec ) {
                let newVoter = new VoterModel( {
                    personId: b.personId,
                    campaigns: []
                } );
                console.log( newVoter );
                yield newVoter.save();
                this.success( {
                    voter: newVoter
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'Voter already exists'
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
