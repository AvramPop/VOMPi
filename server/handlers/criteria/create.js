'use strict';

exports = module.exports = ( CriteriaModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CriteriaModel.findOne( {
                campaignId: b.campaignId
            } ).exec();
        console.log( b );
        if ( !rec ) {
            let newCriteria = new CriteriaModel( {
                campaignId: b.campaignId
            } );
            console.log( newCampaign );
            yield newCriteria.save();
            this.success( {
                criteria: newCriteria
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Criteria for this campaign already exists'
            } );
        }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/criteriaModel'
];
