'use strict';

exports = module.exports = ( CriteriaModel ) => {
    return function* ( livingAreaId ) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CriteriaModel.findOne( {
                requiresMaturity: b.requiresMaturity,
                requiresLocation: b.requiresLocation
                    //celalalt identificator
            } ).exec();
        console.log( b );
        if ( rec.requiresLocation ) {
            rec.locationRequired.push( livingAreaId );
        }
        yield rec.save();
        this.success( {
            criteria: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/criteriaModel'
];
