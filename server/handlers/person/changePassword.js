'use strict';

var crypto = require( 'crypto-js' );

exports = module.exports = ( PersonModel, sendMail ) => {
    return function* ( email ) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findOne( {
                email: b.email,
                uniqueIdentifier: b.uniqueIdentifier
            } ).exec();
        if ( !rec ) {
            throw ( {
                code: '422',
                message: 'There is no person with this unique identifier'
            } );
        }
        if ( true /*aici ar trebui validatori de parola, sa fie de 8 caractere etc*/ ) {
            rec.password = b.password;
            rec.save();
            var name = rec.firstName + ' ' + rec.lastName;
            sendMail.sendPersonSuccesfullChangedPasswordEmail( name, rec.email, 'asd' /*token pt reset password*/ );
        } else {
            console.log( 'password does not match criteria' );
        }
        this.success( {
            admins: rec
        } );
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'libs/email'
];