//country region town street
'use strict';

exports = module.exports = ( LivingAreaModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield LivingAreaModel.findById( b.id ).exec();
        console.log( b );
        if ( rec ) {
            rec.country = b.country;
            rec.region = b.region;
            rec.town = b.town;
            rec.street = b.street;
            yield rec.save();
            this.success( {
                livingAreas: rec
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Living area does not exist'
            } );
        }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/livingAreaModel'
];
