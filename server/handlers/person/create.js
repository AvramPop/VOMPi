'use strict';

exports = module.exports = ( PersonModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.findOne( {
                uniqueIdentifier: b.uniqueIdentifier
            } ).exec();
        console.log( b );
        if ( !rec ) {
            let newPerson = new PersonModel( {
                firstName: b.firstName,
                lastName: b.lastName,
                email: b.email,
                uniqueIdentifier: b.uniqueIdentifier,
                gender: b.gender,
                dateOfBirth: b.dateOfBirth,
                livingArea: b.livingArea,
                isActivated: false,
                telephone: b.telephone
            } );
            console.log( newPerson );
            yield newPerson.save();
            this.success( {
                person: newPerson
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Person already exists'
            } );
        }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel'
];
