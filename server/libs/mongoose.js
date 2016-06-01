'use strict';

exports = module.exports = () => {
    return require( 'mongoose' );
};

exports[ '@singleton' ] = true;
