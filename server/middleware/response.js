'use strict';

exports = module.exports = () => {
    // pre-create status objects to prevent on-the-fly creation
    let resp = {
        success: {
            status: 'success',
            data: {}
        },
        fail: {
            status: 'error',
            error: {
                code: 500,
                msg: 'Internal Server Error',
                details: {}
            }
        }
    };

    return ( app ) => {
        app.context.success = function ( data ) {
            resp.success.data = data;
            this.body = resp.success;
        };

        app.context.fail = function ( code, error ) {
            resp.fail.error.code = error.code || error.statusCode;
            resp.fail.error.msg = error.message;
            resp.fail.error.details = error.details;

            this.status = code;
            this.body = resp.fail;
        };

        return app;
    };
};

exports[ '@singleton' ] = true;
