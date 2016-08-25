'use strict';

exports = module.exports = ( Person, JWT ) => {
    return function* () {
        let b = this.request.body,
            // Verify if user in DB
            user = yield Person.findOne( {
                uniqueIdentifier: b.uniqueIdentifier,
                password: b.password

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
        let userToken = JWT.sign( {
            uniqId: user.uniqueIdentifier,
            firstName: user.firstName,
            lastName: user.lastName
        } );

        console.log( userToken );

        // Send Response
        this.success( {
            token: userToken
        } );
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel',
    'libs/jwtoken'
];
