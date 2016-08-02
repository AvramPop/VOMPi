//ajunge aici cand primeste mail
'use strict';

exports = module.exports = ( PersonModel, sendMail ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findOne( {
                uniqueIdentifier: b.uniqueIdentifier //ar trebui sa stie singur cine ii
            } ).exec();
        console.log( b );
        if ( b.password === b.repeatPassword ) {
            rec.password = b.password;
            rec.isActivated = true;
            yield rec.save();
            sendMail.sendPersonSuccesfullActivatedAccountMail( ( rec.firstName + ' ' + rec.lastName ), rec.email, 'asd' /*link pt reset password*/ );
        } else {
            throw ( {
                code: 404,
                message: 'Passwords dont match'
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
