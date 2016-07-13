'use strict';

exports = module.exports = ( CampaignModel, CriteriaModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            campaignRec = yield CampaignModel.find( {
                name: b.name
            } ).exec(),
            criteriaRec = yield CriteriaModel.findById( CriteriaModel._id ).exec();
        campaignRec.criteriaId = criteriaRec._id;
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
