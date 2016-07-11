'use strict';

exports = module.exports = ( LivingAreaModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield LivingAreaModel.find( {} ).exec();
        this.success( {
            livingArea: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/livingAreaModel'
];
