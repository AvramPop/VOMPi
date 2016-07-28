'use strict';

exports = module.exports = ( Person, JWT ) => {
    return function* () {
        let b = this.request.body,
            // Verify if user in DB
            user = yield Person.findOne( {
                email: b.email,
                password: b.password
                    // uniqueIdentifier: b.uniqueIdentifier
            } ).exec();

        // Handle error if doesn't exist
        if ( !user ) {
            throw ( {
                code: 401,
                message: {
                    en: 'Invalid user credentials!',
                }
            } );
        }

        // Create user token
        let userToken = JWT.signToken( {
            uniqId: user.uniqueIdentifier,
            firstName: user.firstName,
            lastName: user.lastName
        } );

        console.log( userToken );

        // Send Response
        this.success();
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'libs/jwtoken'
];
