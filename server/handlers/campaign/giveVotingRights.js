'use strict';

let utils = require( '../../libs/utils' );

exports = module.exports = ( CampaignModel, CriteriaModel, PersonModel, VoterModel ) => {
    //oare aici se pun sau un rand mai jos astea?? ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            campaignRec = yield CampaignModel.findOne( {
                name: b.name
            } ).exec(),
            personRec = yield PersonModel.find().exec();
        for ( var pers in personRec ) {
            var voter;
            var a, c;
            if ( ( campaignRec.criteria.requiresMaturity && utils.calculateAge( pers.dateOfBirth ) > 18 ) ||
                !campaignRec.criteria.requiresMaturity ) {
                a = true;
            }
            if ( ( campaignRec.criteria.requiresLocation &&
                    campaignRec.criteria.locationRequired.indexOf( pers.livingArea ).livingArea ) ||
                //aici primeste un id deci probabil nu ii oblu
                !campaignRec.criteria.requiresLocation ) {
                c = true;
            }
            if ( a && c ) {
                voter = yield VoterModel.findOne( {
                    personId: pers._id //oare are asa ceva?
                } ).exec();
                voter.campaigns.push( campaignRec ); //asta nui ok!!
                voter.campaigns.push( {
                    campaignId: campaignRec._id
                } ); // ceva nu pusca aici but watever
            } else {
                console.log( 'Person with unique identifier ' +
                    pers.uniqueIdentifier + ' does ot fullfill the required criterias' +
                    ' to vote in this campaign' );
            }
        }
        this.success( {
            campaign: campaignRec
        } );
    };
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'model/campaignModel',
    'model/criteriaModel',
    'model/personModel',
    'model/voterModel'
];
