'use strict';

exports = module.exports = ( AdminModel ) => {
    return function* ( aEmail ) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.findOne( {
                email: aEmail
            } ).exec();
        rec.isAlive = false;
        rec.save();
        this.success( {
            deactivated: true
        } );
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/adminModel'
];
