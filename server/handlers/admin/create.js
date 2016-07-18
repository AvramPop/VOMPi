'use strict';

exports = module.exports = ( AdminModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.findOne( {
                email: b.email
            } ).exec();
        console.log( b );
        if ( !rec ) {
            let newAdmin = new AdminModel( {
                //  password: b.password,
                //  email: b.email,
                //  active: false,
                email: b.email,
                password: b.password
            } );
            console.log( newAdmin );
            yield newAdmin.save();
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
    'model/adminModel'
];