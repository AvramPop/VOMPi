'use strict';

exports = module.exports = ( Admin, JWT ) => {
    return function* () {
        let b = this.request.body,
            // Verify if user in DB
            user = yield Admin.findOne( {
                email: b.email,
                password: b.password
                    // uniqueIdentifier: b.uniqueIdentifier
            } ).exec();

        // Handle error if doesn't exist
        if ( !user ) {
            throw ( {
                code: 401,
                message: {
                    en: 'Invalid admin credentials!',
                }
            } );
        }

        // Create user token
        let userToken = JWT.sign( {
            email: user.email,
            username: user.username
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
    'model/adminModel',
    'libs/jwtoken'
];
