'use strict';

let co = require( 'co' ),
    CronJob = require( 'cron' ).CronJob;

exports = module.exports = ( echo, overpass, wikiJS, cityModel ) => {
    let job = {
        getCities: new CronJob( {
            // cronTime: '00 10 00 * * 1-5',           // Every weekday (Monday - Friday) at 00:10AM
            cronTime: '*/5 * * * *', // Every 2 minutes
            onTick: co.wrap( function* () {
                echo.warning( 'Cron task running...Getting all cities from overpass...' );

                let query = '[out:json][timeout:25];' +
                    'area[name="România"]->.a;' +
                    '(node(area.a)[place=city];);' +
                    'out body;>;out skel qt;',
                    res = yield overpass.get( query );

                echo.info( '::: DEBUGING CRON RESPONSE ::: ' );
                echo.debug( JSON.stringify( res ) );

                let cities = res.features.map( city => ( {
                    _id: city.properties.id,
                    coordinates: {
                        lat: city.geometry.coordinates[ 1 ],
                        lng: city.geometry.coordinates[ 0 ]
                    },
                    name: city.properties.tags.name,
                    links: {
                        wikipedia: ( city.properties.tags.wikipedia ) ?
                            city.properties.tags.wikipedia.split( ':' )[ 1 ] : null
                    },
                    is_in: {
                        province: ( city.properties.tags[ 'is_in:province' ] ) ?
                            city.properties.tags[ 'is_in:province' ] : null
                    }
                } ) );

                cityModel.create( cities, ( err, res ) => {
                    if ( err ) {
                        echo.error( ':-( Whoops, something goes wrong! : ' + JSON.stringify( err ) );
                    } else {
                        echo.success( 'Cron task finished successfully! :-) ' );
                    }
                } );
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
