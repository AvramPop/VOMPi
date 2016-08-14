'use strict';

exports = module.exports = ( CriteriaModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {

            let newCriteria = new CriteriaModel( {
                requiresMaturity: b.requiresMaturity,
                requiresLocation: b.requiresLocation
            } );
            console.log( newCriteria );
            yield newCriteria.save();
            this.success( {
                criteria: newCriteria
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
    'libs/jwtoken'
];
