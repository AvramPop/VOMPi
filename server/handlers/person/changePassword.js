//daca o fost uitata si o primit mail

'use strict';

var crypto = require( 'crypto-js' );

exports = module.exports = ( PersonModel, sendMail ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findOne( {
                uniqueIdentifier: b.uniqueIdentifier
            } ).exec();
        if ( !rec ) {
            throw ( {
                code: '422',
                message: 'There is no person with this unique identifier'
            } );
        } else {
            if ( b.password === b.repeatPassword /*aici ar trebui validatori de parola, sa fie de 8 caractere etc*/ ) {
                rec.password = b.password;
                rec.save();
                var name = rec.firstName + ' ' + rec.lastName;
                sendMail.sendPersonSuccessfullyChangedPasswordEmail( name, rec.email );
                this.success( {
                    admins: rec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'passwords dont match or dont match criteria'
                } );
            }
        }
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'libs/email'
];
