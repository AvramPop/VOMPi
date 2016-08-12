'use strict';

exports = module.exports = ( LivingAreaModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield LivingAreaModel.findById( b.id ).exec();
            console.log( b );
            if ( rec ) {
                rec.country = b.country;
                rec.region = b.region;
                rec.town = b.town;
                rec.street = b.street;
                yield rec.save();
                this.success( {
                    livingAreas: rec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'Living area does not exist'
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
