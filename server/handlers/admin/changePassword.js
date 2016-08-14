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
        } else {
            if ( b.password === b.repeatPassword /*aici ar trebui validatori de parola, sa fie de 8 caractere etc*/ ) {
                rec.password = b.password;
                rec.save();
                sendMail.sendAdminSuccessfullyChangedPasswordEmail( rec.username, rec.email );
                this.success( {
                    admins: rec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'the passwords do not correspond'
                } );
            }
        }
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/adminModel',
    'libs/email'
];
