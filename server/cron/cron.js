'use strict';

let co = require( 'co' ),
    CronJob = require( 'cron' ).CronJob;

exports = module.exports = ( echo, overpass, wikiJS, cityModel ) => {
    let job = {
        makeVoters: new CronJob( {
            // cronTime: '00 10 00 * * 1-5',           // Every weekday (Monday - Friday) at 00:10AM
            cronTime: '*/5 * * * *', // Every 2 minutes
            onTick: co.wrap( function* ( h, b ) {
                let job = Job.find( {
                    done: false
                } );
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

            } ),
            start: true,
            runOnInit: true
        } )
    };

    return job;
};
exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/echo',
    'libs/overpass',
    'libs/wikiJS',
    'model/cityModel'
];
