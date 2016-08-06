'use strict';

exports = module.exports = ( PersonModel, sendMail, JWT ) => {
    return function* ( id ) {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield PersonModel.findById( id ).exec();
            sendMail.sendPersonDeletedAccountEmail( rec.firstName, rec.email );
            yield rec.remove();
            this.success( {
                persons: rec
            } );
            // this.success({ user: 'ceva' });
        } else {
            throw ( {
                code: 422,
                message: 'Invalid token'
            } );
        }
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'libs/email',
    'libs/jwtoken'
];
