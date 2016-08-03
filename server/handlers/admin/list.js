'use strict';

exports = module.exports = ( AdminModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            let rec = yield AdminModel.find( {} ).exec();
            this.success( {
                admins: rec
            } );
        } else {
            throw ( {
                code: 422,
                message: 'Invalid token'
            } );
        }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/adminModel',
    'libs/jwtoken'
];
