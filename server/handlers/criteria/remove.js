'use strict';

exports = module.exports = ( CriteriaModel ) => {
    return function* (id) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CriteriaModel.findById( {
              _id: id
            } ).remove().exec();
        this.success( {
            criterias: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/criteriaModel'
];
