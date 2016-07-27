'use strict';

var crypto = require( 'crypto-js' );

exports = module.exports = ( AdminModel, sendMail ) => {
    return function* ( email ) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.findOne( {
                email: b.email
            } ).exec();
        if ( !rec ) {
            throw ( {
                code: '422',
                message: 'There is no admin with this email'
            } );
        }
        sendMail.sendRegistrationEmail( 'Dani' /*rec.username*/ , rec.email, 'asd' );
        this.success( {
            admins: rec
        } );
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/adminModel',
    'libs/email'
];
