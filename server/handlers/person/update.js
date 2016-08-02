//si parola ar trebui aci
'use strict';

exports = module.exports = ( PersonModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findById( b.id ).exec();
        console.log( b );
        if ( rec ) {
            rec.firstName = b.firstName;
            rec.lastName = b.lastName;
            rec.email = b.email;
            rec.uniqueIdentifier = b.uniqueIdentifier;
            rec.gender = b.gender;
            if ( 1 /*bonafide.isDate( b.startDate ) nu este asa ceva!*/ ) {
                rec.dateOfBirth = b.dateOfBirth;
            }
            rec.livingArea = b.livingArea;
            rec.telephone = b.telephone;
            yield rec.save();
            this.success( {
                persons: rec
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Person does not exist'
            } );
        }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel'
];
