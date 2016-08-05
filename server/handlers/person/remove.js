'use strict';

exports = module.exports = ( PersonModel, sendMail ) => {
    return function* ( id ) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findById( id ).exec();
        sendMail.sendPersonDeletedAccountEmail( rec.firstName, rec.email );
        yield rec.remove();
        this.success( {
            persons: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'libs/email'
];
