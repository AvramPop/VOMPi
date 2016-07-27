'use strict';

exports = module.exports = ( CampaignModel, CriteriaModel ) => {
    return function* ( criteriaId ) {
        let h = this.request.header,
            b = this.request.body,
            campaignRec = yield CampaignModel.findOne( {
                name: b.name
            } ).exec(),
            criteriaRec = yield CriteriaModel.findById( criteriaId ).exec();
        campaignRec.criteria = criteriaRec;
        yield campaignRec.save();
        this.success( {
            campaign: campaignRec
        } );
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/campaignModel',
    'model/criteriaModel'
];
