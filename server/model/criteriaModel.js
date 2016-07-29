'use strict';

exports = module.exports = ( database, settings, mongoose, criteriaSchema ) => {
    let Criteria = mongoose.model( 'Criteria', criteriaSchema, 'Criterias' );
    return Criteria;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/database',
    'libs/settings',
    'libs/mongoose',
    'schemas/criteriaSchema'
];
