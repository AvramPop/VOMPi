'use strict';

exports = module.exports = ( database, settings, mongoose, adminSchema ) => {
    let Admin = mongoose.model( 'Admin', adminSchema, 'Admins' );
    return Admin;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/database',
    'libs/settings',
    'libs/mongoose',
    'schemas/adminSchema'
];
