'use strict';

exports = module.exports = ( CriteriaModel, LivingAreaModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var criteria = yield CriteriaModel.findById( b.criteriaId ).exec(),
                location = yield LivingAreaModel.findById( b.livingAreaId ).exec();
            console.log( b );
            if ( criteria.requiresLocation ) {
                criteria.locationRequired.push( location._id );
                yield criteria.save();
            } else {
                console.log( 'This criteria do not require locations' );
            }
            this.success( {
                criteria: criteria
            } );
            
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
    'model/criteriaModel',
    'model/livingAreaModel',
    'libs/jwtoken'
];
