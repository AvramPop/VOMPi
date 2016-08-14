'use strict';

exports = module.exports = ( AdminModel, sendMail ) => {
    return function* ( id ) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.findById( id ).exec();
        if ( rec ) {
            sendMail.sendAdminDeletedAccountEmail( rec.username, rec.email );
            yield rec.remove();
            this.success( {
                admins: rec
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Admin not found!'
            } );
        }
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/adminModel',
    'libs/email'
];
