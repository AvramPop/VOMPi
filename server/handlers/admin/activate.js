'use strict';

exports = module.exports = ( AdminModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.findOne( {
                email: b.email
            } ).exec();
        rec.isAlive = true;
        rec.save();
        this.success( {
            activated: true
        } );
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/adminModel'
];
