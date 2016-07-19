'use strict';

exports = module.exports = ( VoterModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield VoterModel.find( {} ).exec();
        this.success( {
            voters: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/voterModel'
];
