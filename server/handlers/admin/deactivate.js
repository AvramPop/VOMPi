'use strict';

exports = module.exports = ( AdminModel ) => {
    return function* ( aEmail ) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.findOne( {
                email: aEmail
            } ).exec();
        if ( rec ) {
            rec.isAlive = false;
            rec.save();
            this.success( {
                deactivated: true
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Admin not found!'
            } );
        }
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/adminModel'
];
