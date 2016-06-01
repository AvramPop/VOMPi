'use strict';

exports = module.exports = ( echo ) => {
    return function* () {
        this.success( {
            msge: 'All Good!!'
        } );
    };
};

exports[ 'singleton' ] = true;
exports[ '@require' ] = [
    'libs/echo'
];
