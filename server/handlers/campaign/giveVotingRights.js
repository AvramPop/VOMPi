'use strict';

//let utils = require( '../libs/utils' ); // make it work!!!!
let _ = require( 'underscore' );

function calculateAge( birthday ) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date( ageDifMs ); // miliseconds from epoch
    return Math.abs( ageDate.getUTCFullYear() - 1970 );
}

exports = module.exports = ( CampaignModel, CriteriaModel, PersonModel, VoterModel, JWT ) => {
    return function* () {
        let h = this.request.header,
            b = this.request.body,
            auth = JWT.verify( h[ 'x-auth-token' ] );
        if ( auth ) {
            var campaignRec = yield CampaignModel.findOne( b.campaignId ).exec(),
                personRec = yield PersonModel.find().exec(),
                criteria = yield CriteriaModel.findById( campaignRec.criteria ).exec();
            if ( campaignRec ) {
                if ( personRec ) {
                    if ( criteria ) {
                        for ( var i = 0; i < personRec.length; i++ ) {
                            var a = false,
                                c = false;
                            var age = calculateAge( personRec[ i ].dateOfBirth );
                            if ( ( criteria.requiresMaturity && age > 18 ) ||
                                !criteria.requiresMaturity ) {
                                a = true;
                            }
                            if ( ( criteria.requiresLocation &&
                                    criteria.locationRequired.indexOf( personRec[ i ].livingArea ) ) ||
                                !criteria.requiresLocation ) {
                                c = true;
                            }
                            if ( a && c ) {
                                let voter = yield VoterModel.findOne( {
                                    personId: personRec[ i ]._id
                                } ).exec();
                                var k = false;
                                for ( var j = 0; j < voter.campaigns.length; j++ ) {
                                    if ( voter.campaigns[ j ].campaignId.equals( b.campaignId ) ) {
                                        k = true;

                                    }
                                }
                                if ( !k ) {
                                    voter.campaigns.push( {
                                        campaignId: campaignRec._id
                                    } );
                                    yield voter.save();
                                    console.log( 'Person with unique identifier ' +
                                        personRec[ i ].uniqueIdentifier +
                                        ' was successfully awarded with voting rights' +
                                        ' for this campaign' );
                                    this.success( {
                                        campaign: campaignRec
                                    } );
                                } else {
                                    throw ( {
                                        code: 404,
                                        message: 'campaign already added!'
                                    } );
                                }

                            } else {
                                throw ( {
                                    code: 404,
                                    message: 'Person with unique identifier ' +
                                        personRec[ i ].uniqueIdentifier + ' does not fullfill the required criterias' +
                                        ' to vote in this campaign'
                                } );
                            }
                        }
                    } else {
                        throw ( {
                            code: 404,
                            message: 'Crtiteria not found!'
                        } );
                    }
                } else {
                    throw ( {
                        code: 404,
                        message: 'Person not found!'
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
    'model/personModel',
    'model/voterModel',
    'libs/jwtoken'
];
