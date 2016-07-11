'use strict';

exports = module.exports = ( database, settings, mongoose, livingAreaSchema ) => {
    let LivingArea = mongoose.model( 'LivingArea', livingAreaSchema, 'LivingArea' );
    return LivingArea;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/database',
    'libs/settings',
    'libs/mongoose',
    'schemas/livingAreaSchema'
];
