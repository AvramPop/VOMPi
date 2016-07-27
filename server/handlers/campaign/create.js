'use strict';

exports = module.exports = ( CampaignModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CampaignModel.findOne( {
                name: b.name
            } ).exec();
        console.log( b );
        if ( !rec ) {
            let newCampaign = new CampaignModel( {
                name: b.name,
                startDate: b.startDate,
                duration: b.duration,
                isCreating: true,
                isAlive: false,
                candidates: []
            } );
            console.log( newCampaign );
            yield newCampaign.save();
            this.success( {
                campaigns: newCampaign
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Campaign already exists'
            } );
        }
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/CampaignModel'
];
