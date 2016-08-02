'use strict';

//let bonafide = require( 'bonafide' );

exports = module.exports = ( CampaignModel ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CampaignModel.findById( b.id ).exec();
        //  console.log( b );
        console.log( rec );
        if ( rec ) {
            if ( b.name ) rec.name = b.name;
            if ( b.startDate /*bonafide.isDate( b.startDate ) nu este asa ceva!*/ ) {
                rec.startDate = b.startDate;
            }
            if ( b.duration ) rec.duration = b.duration;
            yield rec.save();
            this.success( {
                campaigns: rec
            } );
        } else {
            throw ( {
                code: 404,
                message: 'Campaign does not exist'
            } );
        }
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/campaignModel'
];
