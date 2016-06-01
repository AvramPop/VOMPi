'use strict';

let clc = require( 'cli-color' );

exports = module.exports = () => {
    return {
        error: msge => {
            return clc.redBright.bold( msge );
        },
        success: msge => {
            return clc.greenBright( msge );
        },
        warning: msge => {
            return clc.yellowBright( msge );
        },
        info: msge => {
            return clc.blueBright( msge );
        },
        debug: msge => {
            return clc.cyan( msge );
        }
    };
};

exports[ '@singleton' ] = true;
