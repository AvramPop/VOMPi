'use strict';

exports = module.exports = ( PersonModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1/*JWT.verify( h[ 'x-auth-token' ] )*/;
        if ( auth ) {
            let rec = yield PersonModel.find( {} ).exec();
            if ( rec ) {
                this.success( {
                    persons: rec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'Persons not found'
                } );
            }
        } else {
            throw ( {
                code: 422,
                message: 'Invalid token'
            } );
        }

    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'libs/jwtoken'
];
