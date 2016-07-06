'use strict';

exports = module.exports = ( database, settings, mongoose, personSchema ) => {
    let Person = mongoose.model( 'Person', personSchema, 'Persons' );
    return Person;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/database',
    'libs/settings',
    'libs/mongoose',
    'schemas/personSchema'
];
