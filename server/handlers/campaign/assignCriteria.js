'use strict';

exports = module.exports = ( CampaignModel, CriteriaModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var campaignRec = yield CampaignModel.findOne( {
                    name: b.name
                } ).exec(),
                criteriaRec = yield CriteriaModel.findById( b.criteriaId ).exec();
            if ( campaignRec ) {
                if ( criteriaRec ) {
                    campaignRec.criteria = criteriaRec;
                    yield campaignRec.save();
                    this.success( {
                        campaign: campaignRec
                    } );
                } else {
                    throw ( {
                        code: 404,
                        message: 'Criteria not found!'
                    } );
                }
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
    'model/criteriaModel',
    'libs/jwtoken'
];
