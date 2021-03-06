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
        } else {
            console.log( rec );
            sendMail.sendPersonForgottenPasswordEmail( ( rec.firstName + ' ' + rec.lastName ), rec.email, 'asd' );
            this.success( {
                persons: rec
            } );
        }
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'libs/email'
];
