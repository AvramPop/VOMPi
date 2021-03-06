'use strict';

exports = module.exports = ( CampaignModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1 /*JWT.verify( h[ 'x-auth-token' ] )*/ ;
        if ( auth ) {
            var rec = yield CampaignModel.findOne( {
                name: b.name
            } ).exec();
            console.log( b );
            if ( !rec ) {
                let newCampaign = new CampaignModel( {
                    name: b.name,
                    startDate: new Date( b.startDate ),
                    duration: b.duration,
                    question: b.question,
                    isCreating: true,
                    isAlive: false
                } );
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

        } else {
            throw ( {
                code: 422,
                message: 'Invalid token'
            } );
        }
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/campaignModel',
    'libs/jwtoken'
];
