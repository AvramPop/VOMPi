'use strict';

exports = module.exports = ( PersonModel) => {
    return function *(){
        let h = this.request.header,
            b = this.request.body,
            rec = yield PersonModel.find({}).exec();
            this.success({ users: rec });
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/personModel'
];
