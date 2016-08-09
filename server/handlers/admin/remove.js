'use strict';

exports = module.exports = ( AdminModel, sendMail ) => {
    return function* ( id ) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.findById( id ).exec();
        sendMail.sendAdminDeletedAccountEmail( rec.username, rec.email );
        yield rec.remove();
        this.success( {
            admins: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/adminModel',
    'libs/email'
];
