'use strict';

exports = module.exports = ( VoterModel, PersonModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findOne( {
                uniqueIdentifier: b.uniqueIdentifier
            } ).exec(),
            rec2 = yield VoterModel.findOne( {
                personId: rec._id
            } );
        this.success( {
            voters: rec2
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/voterModel',
    'model/personModel'
];
