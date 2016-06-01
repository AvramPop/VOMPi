'use strict';

var p = require( '../../package.json' ),
    loadEnv = require( 'dotenv' ),
    version = p.version.split( '.' ).shift(),
    apiVers = ( version > 0 ? '/v' + version : '' );

exports = module.exports = () => {

    loadEnv.config();

    return {
        HOST: process.env.HOST_ADDRESS,
        PORT: process.env.HOST_PORT,
        SYSTEM: {
            name: 'Romania360 Planner Trip App',
            noReplyEmail: 'no-replay@local.dev.romania360'
        },
        API: {
            root: '/api',
            version: apiVers
        },
        DB: {
            url: process.env.DB_URI
        },
        OVERPASS: {
            api: 'http://overpass-api.de/api/interpreter'
        },
        SENGRID: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
        },
        GOOGLE: {
            clientID: process.env.GOOGLE_CLIENTID,
            secret: process.env.GOOGLE_SECRET
        },
        FACEBOOK: {
            appID: process.env.FACEBOOK_APPID,
            secret: process.env.FACEBOOK_SECRET
        },
        SESSION: {
            key: process.env.SESSION_KEY,
            secret: process.env.SESSION_SECRET,
            expire: 2592000 // seconds (30 days default)
        },
        JSON: {
            limit: '20mb'
        },
        PATH: {
            tmp: 'tmp/'
        },
        TIMEOUT: 2000
    };
};

exports[ '@singleton' ] = true;
