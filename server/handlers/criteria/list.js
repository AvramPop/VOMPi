'use strict';

exports = module.exports = ( CriteriaModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1/*JWT.verify( h[ 'x-auth-token' ] )*/;
        if ( auth ) {
            var rec = yield CriteriaModel.find( {} ).exec();
            if ( rec ) {
                this.success( {
                    criterias: rec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'Criteria array not found'
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
    'libs/jwtoken'
];
