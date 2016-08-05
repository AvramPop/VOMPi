'use strict';

exports = module.exports = ( PersonModel, sendMail ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findOne( {
                uniqueIdentifier: b.uniqueIdentifier
            } ).exec();
        console.log( rec );
        if ( rec ) {
            console.log( 'asad' );
            if ( !rec.isActivated ) {
                console.log( 'sdafc' );
                sendMail.sendPersonSignUpLinkEmail( ( rec.firstName + ' ' + rec.lastName ), rec.email, 'asd' /*link pt reset password*/ );
                this.success( {
                    person: rec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'Person account is already activated'
                } );
            }
        } else {
            throw ( {
                code: 404,
                message: 'Person does not exist'
            } );
        }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'libs/email'
];
