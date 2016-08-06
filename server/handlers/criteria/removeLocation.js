'use strict';

exports = module.exports = ( CriteriaModel, LivingAreaModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var criteriaRec = yield CriteriaModel.findById( b.criteriaId ).exec();
            var index = criteriaRec.locationRequired.indexOf( b.livingAreaId );
            //    console.log( campaignRec + index );
            if ( index > -1 ) {
                criteriaRec.locationRequired.splice( index, 1 );
                yield criteriaRec.save();
            }
            this.success( {
                criterias: criteriaRec
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
