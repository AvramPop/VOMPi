'use strict';

exports = module.exports = ( CampaignModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = 1 /*JWT.verify( h[ 'x-auth-token' ] )*/ ;
        if ( auth ) {
            var rec = yield CampaignModel.findOne( {
                name: b.name
            } ).populate( {
                'path': 'candidates',
                populate: {
                    path: 'personId'
                }
            } ).exec();
            if ( rec ) {
                console.log( rec );
                this.success( {
                    campaign: rec
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'There is no campaign with this name'
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
