'use strict';

exports = module.exports = ( VoterModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield VoterModel.findOne( {
                personId: b.personId
            } ).exec();
        console.log( b );
        if ( !rec ) {
            let newVoter = new VoterModel( {
                personId: b.personId,
                campaigns: b.campaigns
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
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/VoterModel'
];
