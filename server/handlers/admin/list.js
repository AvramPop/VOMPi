'use strict';

exports = module.exports = ( AdminModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.find( {} ).exec();
        this.success( {
            admins: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/adminModel'
];