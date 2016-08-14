'use strict';

exports = module.exports = ( CampaignModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var rec = yield CampaignModel.findById( b.id ).exec();
            if ( rec ) {
                rec.isAlive = false;
                //aici se fac joburile si/sau se pune timer pt durata in ORE!!!
                rec.save();
                this.success( {
                    activated: true
                } );
            } else {
                throw ( {
                    code: 404,
                    message: 'Campaign not found!'
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
