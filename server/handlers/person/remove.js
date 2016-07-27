'use strict';

exports = module.exports = ( PersonModel ) => {
    return function* ( id ) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findById( id ).remove().exec();
        this.success( {
            persons: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel'
];
