'use strict';

exports = module.exports = ( CampaignModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield Campaign.findOne( {
                //need some special identifier, not to (incurca) different numbers of same street, same town, etc
                name: b.name
            } ).exec();
        console.log( b );
        if ( !rec ) {
            let newCampaign = new CampaignModel( {
                name: b.name,
                startDate: b.startDate,
                isCreating: true,
                duration: b.duration,
                candidates: b.candidates,
                numberOfAllowedVoters: b.numberOfAllowedVoters,
                isCreating: b.isCreating,
                isAlive: b.isAlive
            } );
            console.log( newCampaign );
            yield newCampaign.save();
            this.success( {
                campaign: newCampaign
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
    'model/campaignModel'
];
