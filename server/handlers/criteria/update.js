// req mat && req loc
'use strict';

exports = module.exports = ( CriteriaModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield CriteriaModel.findById( b.id ).exec();
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
