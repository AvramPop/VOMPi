'use strict';

exports = module.exports = ( CampaignModel, JWT ) => {
    return function* ( id ) {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield CampaignModel.findById( id ).exec();
            if ( rec ) {
                yield rec.remove();
                this.success( {
                    campaigns: rec
                } );
            } else {
                throw ( {
                    code: 422,
                    message: 'Campaign not found'
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
