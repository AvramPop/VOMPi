'use strict';

exports = module.exports = ( VoterModel ) => {
    return function* (id) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield VoterModel.findById( {
              _id: id
            } ).remove().exec();
        this.success( {
            voters: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel'
];
