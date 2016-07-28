'use strict';

let co = require( 'co' );

exports = module.exports = ( mongoose, userSchema ) => {
    let User = mongoose.model( 'User', userSchema, 'Users' );
    return User;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose',
    'schemas/userSchema'
];
