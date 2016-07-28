'use strict';

exports = module.exports = ( PersonModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            validate = JWT.verify( h[ 'access-token' ] );
        if ( validate ) {
            let rec = yield PersonModel.find( {} ).exec();
            this.success( {
                persons: rec
            } );
            // this.success({ user: 'ceva' });
        } else {
            throw ( {
                code: 401,
                message: {
                    en: 'Invalid user credentials!',
                }
            } );
        }

    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'libs/jwtoken'
];
