'use strict';

exports = module.exports = ( CandidateModel ) => {
    return function* (id) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CandidateModel.findById( {
              _id: id
            } ).remove().exec();
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
