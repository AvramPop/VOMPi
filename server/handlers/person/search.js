'use strict';

exports = module.exports = ( PersonModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findOne( {
                uniqueIdentifier: b.uniqueIdentifier
            } ).exec();
        this.success( {
            person: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel'
];
