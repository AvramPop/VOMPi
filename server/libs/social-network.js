'use strict';

let co = require( 'co' ),
    Purest = require( 'purest' );

exports = module.exports = function ( User, Role, _ ) {
    let // Facebook Provider
        facebook = new Purest( {
            provider: 'facebook',
            promise: true
        } ),
        // Google Provider
        google = new Purest( {
            provider: 'google',
            promise: true
        } ),
        // List of Methods to use
        social = {
            facebook: {
                user: getFacebookUser
            },
            google: {
                user: getGoogleUser
            }
        };

    return social;

    function getFacebookUser( ACCESS_TOKEN ) {
        return co( function* () {
                return yield facebook.query()
                    .get( 'me?fields=id,name,first_name,last_name,email,link,picture.width(720).height(720)' )
                    .auth( ACCESS_TOKEN )
                    .request();
            } ).then( function ( results ) {
                return results[ 1 ];
            } )
            .catch( function ( err ) {
                return err;
            } );
    }

    function getGoogleUser( ACCESS_TOKEN ) {
        return co( function* () {
                return yield google.query( 'plus' )
                    .get( 'people/me' )
                    .auth( ACCESS_TOKEN )
                    .request();
            } ).then( function ( results ) {
                return results[ 1 ];
            } )
            .catch( function ( err ) {
                return err;
            } );
    }
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/userModel',
    'model/userRoleModel',
    'libs/lodash'
];
