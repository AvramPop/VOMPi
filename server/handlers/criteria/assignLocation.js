'use strict';

exports = module.exports = ( CriteriaModel, LivingAreaModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            criteria = yield CriteriaModel.findById( b.criteriaId ).exec(),
            location = yield LivingAreaModel.findById( b.livingAreaId ).exec();
        console.log( b );
        if ( criteria.requiresLocation ) {
            criteria.locationRequired.push( location );
            yield criteria.save();
        } else {
            console.log( 'This criteria do not require locations' );
        }
        this.success( {
            criteria: criteria
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/criteriaModel',
    'model/livingAreaModel'
];
