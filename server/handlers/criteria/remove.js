'use strict';

exports = module.exports = ( CriteriaModel, JWT ) => {
    return function* ( id ) {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield CriteriaModel.findById( id ).remove().exec();
            this.success( {
                criterias: rec
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
