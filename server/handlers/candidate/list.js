'use strict';

exports = module.exports = ( CandidateModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CandidateModel.find( {} ).exec();
        this.success( {
            candidates: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/candidateModel'
];
