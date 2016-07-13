'use strict';

var crypto = require( 'crypto-js' );

exports = module.exports = ( AdminModel, sendMail ) => {
    return function* ( email ) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.findOne( {
                email: b.email
            } ).exec();
        // var cardEmail = new sendgrid.Email( {
        //     to: b.email,
        //     from: 'Dany4God@gmail.com'
        // } );
        // cardEmail.setFilters( {
        //     'templates': {
        //         'settings': {
        //             'enabled': 1,
        //             'template_id': '45346727-462c-4d9c-a269-30b8863bd027'
        //         }
        //     }
        // } );
        if ( !rec ) {
            throw ( {
                code: '422',
                message: 'error'
            } );
        }
        sendMail.sendRegistrationEmail( 'Dani', rec.email, crypto.md5( new Date() + rec.email + 'ceva salt hashs' +
            ' ca sa nu stie ce si cum sa generat' ) );
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
