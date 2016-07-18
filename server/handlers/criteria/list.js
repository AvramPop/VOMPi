'use strict';

exports = module.exports = ( CriteriaModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CriteriaModel.find( {} ).exec();
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
