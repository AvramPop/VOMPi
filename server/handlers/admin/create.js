'use strict';

exports = module.exports = ( AdminModel, sendMail ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.findOne( {
                email: b.email
            } ).exec();
        console.log( b );
        if ( !rec ) {
            let newAdmin = new AdminModel( {
                email: b.email,
                username: b.username,
                password: b.password,
                isAlive: false
            } );
            console.log( newAdmin );
            yield newAdmin.save();
            sendMail.sendAdminRegistrationEmail( rec.username, rec.email );
            this.success( {
                admin: newAdmin
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Admin already exists'
            } );
        }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/adminModel',
    'libs/email'
];
