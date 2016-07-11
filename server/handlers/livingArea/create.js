'use strict';

exports = module.exports = ( LivingAreaModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield LivingAreaModel.findOne( {
                //need some special identifier, not to (incurca) different numbers of same street, same town, etc
                country: b.country,
                region: b.region,
                town: b.town,
                street: b.street
            } ).exec();
        console.log( b );
        if ( !rec ) {
            let newLivingArea = new LivingAreaModel( {
                //  password: b.password,
                //  email: b.email,
                //  active: false,
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
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/livingAreaModel'
];
