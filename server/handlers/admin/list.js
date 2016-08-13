'use strict';

exports = module.exports = ( AdminModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.find( {} ).exec();
        if ( rec ) {
            this.success( {
                admins: rec
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Not any admins'
            } );
        }
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/adminModel'
];
