'use strict';


exports = module.exports = ( database, settings, mongoose, voterSchema ) => {
    let Voter = mongoose.model( 'Voter', voterSchema, 'Voter' );
    return Voter;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/database',
    'libs/settings',
    'libs/mongoose',
    'schemas/voterSchema'
];
