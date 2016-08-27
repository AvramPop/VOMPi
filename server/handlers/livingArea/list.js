'use strict';

exports = module.exports = ( LivingAreaModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1 /*JWT.verify( h[ 'x-auth-token' ] )*/ ;
        if ( auth ) {
            var rec = yield LivingAreaModel.find().exec();
            if ( rec ) {
                this.success( {
                    livingAreas: rec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'Living area arr does not exist'
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
    'model/livingAreaModel',
    'libs/jwtoken'
];
