'use strict';

exports = module.exports = ( CriteriaModel, LivingAreaModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            criteriaRec = yield CriteriaModel.findById( b.criteriaId ).exec();

        var index = criteriaRec.locationRequired.indexOf( b.livingAreaId );
        //    console.log( campaignRec + index );
        if ( index > -1 ) {
            criteriaRec.locationRequired.splice( index, 1 );
            yield criteriaRec.save();
        }
        this.success( {
            criterias: criteriaRec
        } );
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/criteriaModel',
    'model/livingAreaModel'
];
