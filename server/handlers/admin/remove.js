'use strict';

exports = module.exports = ( AdminModel ) => {
    return function* (id) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield AdminModel.findById( {
              _id: id
            } ).remove().exec();
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
