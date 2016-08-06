'use strict';

exports = module.exports = ( LivingAreaModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield LivingAreaModel.findOne( {
                //need some special identifier, sa nu incurcam aceeasi strada da nr diferite, sa le trimitem scrisori aiurea
                country: b.country,
                region: b.region,
                town: b.town,
                street: b.street
            } ).exec();
            console.log( b );
            if ( !rec ) {
                let newLivingArea = new LivingAreaModel( {
                    country: b.country,
                    region: b.region,
                    town: b.town,
                    street: b.street,
                    /*number: b.number,
                    bloc: b.bloc,
                    etaj: b.etaj,
                    apartament: b.apartament,
                    zipcode: b.zipcode*/
                } );
                console.log( newLivingArea );
                yield newLivingArea.save();
                this.success( {
                    livingArea: newLivingArea
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'Living Area already exists'
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
    'model/livingAreaModel',
    'libs/jwtoken'
];
