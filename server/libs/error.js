'use strict';

/**
 * Error Factory
 *
 * @method create([code], [message], [detailsObject])
 * Return an error object with an optional code (default: 500), optional 'message' (default: 'Internal Error'),
 *
 *  error.create('somemessage')
 *  error.create('somemessage', {someObject: someValue})
 *  error.create(400, 'somemessage')
 *  error.create(400, 'somemessage')
 *
 * @param {Number|String} [code, message]
 * @param {String|Object} [message or details object]
 * @param {Object} [details object]
 */

exports = module.exports = ( ) => {
    let getParameters = function( ) {
        let res = {
            code: 500,
            message: 'Internal Server Error'
        };

        if( typeof arguments[0] === 'number' &&
            typeof arguments[1] === 'string' ) {
            res.code = arguments[0];
            res.message = arguments[1];
            if( typeof arguments[2] === 'object' ) {
                res.details = arguments[2];
            }
        }
        if( typeof arguments[0] === 'string' ) {
            res.message = arguments[0];
            if( typeof arguments[1] === 'object' ) {
                res.details = arguments[1];
            }
        }
        return res;
    };

    return {
        create: ( ) => {
            let pars = getParameters.apply( this, arguments ),
                error = new Error( pars.message );

            error.code = pars.code;
            if (pars.details) {
                error.details = pars.details;
            }

            return error;
        }
    };
};

exports[ '@singleton' ] = true;
