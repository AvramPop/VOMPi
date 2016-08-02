// req mat && req loc
'use strict';

exports = module.exports = ( CriteriaModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CriteriaModel.findById( b.id ).exec();
        console.log( b );
        if ( rec ) {
            rec.requiresMaturity = b.requiresMaturity;
            rec.requiresLocation = b.requiresLocation;
            yield rec.save();
            this.success( {
                criterias: rec
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Criteria does not exist'
            } );
        }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/criteriaModel'
];
