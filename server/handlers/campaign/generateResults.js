'use strict';

exports = module.exports = ( CampaignModel ) => {
    return function* (id) {
        let h = this.request.header,
            b = this.request.body,
            rec = yield CampaignModel.findById( {
              _id: id
            } ).exec();
            rec.candidates.sort(function(a, b) {
              if(a.numberOfVotes > b.numberOfVotes) {
                return 1;
              }
              if(b.numberOfVotes > a.numberOfVotes) {
                return -1;
              } else
                return 0; /*asta nu ar trebui sa se intample, daca is 2 cu acelasi numar de voturi ar trebui sa se intample ceva :) */
            })
            console.log(rec.candidates.toString()); /*oare?*/
            rec.save();
        this.success( {
            campaigns: rec
        } );
        // this.success({ user: 'ceva' });
    };
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/campaignModel',
    'model/candidateModel'
];
