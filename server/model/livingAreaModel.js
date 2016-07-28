'use strict';

exports = module.exports = ( mongoose, livingAreaSchema ) => {
    let LivingArea = mongoose.model( 'LivingArea', livingAreaSchema, 'LivingArea' );
    return LivingArea;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/mongoose',
    'schemas/livingAreaSchema'
];
