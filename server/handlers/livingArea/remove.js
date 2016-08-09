'use strict';

exports = module.exports = ( LivingAreaModel, JWT ) => {
    return function* ( id ) {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield LivingAreaModel.findById( id ).remove().exec();
            console.log( rec );
            this.success( {
                livingAreas: rec
            } );
            // this.success({ user: 'ceva' });
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
