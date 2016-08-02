'use strict';

exports = module.exports = ( CandidateModel, PersonModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findOne( {
                uniqueIdentifier: b.uniqueIdentifier
            } ).exec(),
            rec2 = yield CandidateModel.findOne( {
                personId: rec._id
            } );
        this.success( {
            candidate: rec2
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/candidateModel',
    'model/personModel'
];
