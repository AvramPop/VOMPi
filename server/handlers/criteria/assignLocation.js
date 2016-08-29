'use strict';

exports = module.exports = ( CriteriaModel, LivingAreaModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1/*JWT.verify( h[ 'x-auth-token' ] )*/;
        if ( auth ) {
            var criteria = yield CriteriaModel.findById( b.criteriaId ).exec(),
                location = yield LivingAreaModel.findById( b.livingAreaId ).exec();
            if ( criteria ) {
                if ( location ) {
                    if ( criteria.requiresLocation ) {
                        criteria.locationRequired.push( location._id );
                        yield criteria.save();
                        this.success( {
                            criteria: criteria
                        } );
                    } else {
                        throw ( {
                            code: 404,
                            message: 'This criteria does not require locations'
                        } );
                    }
                } else {
                    throw ( {
                        code: 404,
                        message: 'Location not found'
                    } );
                }
            } else {
                throw ( {
                    code: 404,
                    message: 'Criteria not found'
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
    'model/criteriaModel',
    'model/livingAreaModel',
    'libs/jwtoken'
];
