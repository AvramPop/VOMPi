//ajunge aici cand primeste mail
'use strict';

exports = module.exports = ( PersonModel, sendMail ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findOne( {
                uniqueIdentifier: b.uniqueIdentifier //ar trebui sa stie singur cine ii
            } ).exec();
        if ( rec ) {
            if ( b.password === b.repeatPassword ) {
                rec.password = b.password;
                rec.isActivated = true;
                yield rec.save();
                sendMail.sendPersonRegistrationEmail( ( rec.firstName + ' ' + rec.lastName ), rec.email );
            } else {
                throw ( {
                    code: 404,
                    message: 'Passwords dont match'
                } );
            }
        } else {
            throw ( {
                code: 404,
                message: 'There is not any person with this uid!'
            } );
        }
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'libs/email'
];
