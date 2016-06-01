'use strict';

let IoC = require( 'electrolyte' ),
    settings = IoC.create( 'libs/settings' ),
    config = {
        server: {
            protocol: 'http',
            host: settings.HOST + ':' + settings.PORT
        },
        google: {
            key: settings.GOOGLE.clientID,
            secret: settings.GOOGLE.secret,
            callback: settings.API.root + settings.API.version + '/signin/google',
            scope: [
                'openid',
                'email',
                'profile'
            ]
        },
        facebook: {
            key: settings.FACEBOOK.appID,
            secret: settings.FACEBOOK.secret,
            callback: settings.API.root + settings.API.version + '/signin/facebook',
            scope: [
                'email'
            ]
        }
    };

module.exports = config;
