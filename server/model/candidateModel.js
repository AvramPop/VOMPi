'use strict';


exports = module.exports = ( database, settings, mongoose, candidateSchema ) => {
    let Candidate = mongoose.model( 'Candidate', candidateSchema, 'Candidates' );
    return Candidate;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/database',
    'libs/settings',
    'libs/mongoose',
    'schemas/candidateSchema'
];
