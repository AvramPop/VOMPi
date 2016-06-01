'use strict';

let Q = require( 'q' ),
    co = require( 'co' ),
    queryOverpass = require( 'query-overpass' );

exports = module.exports = ( Utils, settings, _, Category, Tag ) => {
    let overpass = {
        get: getFunc,
        cleanUp: cleanUpFunc,
        getByCoordinates: getByCoordFunc,
        getByLatLong: getByLatLongFunc,
        getCityPoisByTag: getCityPoisByTagFunc,
        getCityPoisByCateg: getCityPoisByCategFunc
    };

    return overpass;

    function getFunc( query ) {
        let deferred = Q.defer();
        queryOverpass( query, deferred.makeNodeResolver() );
        return deferred.promise;
    }

    function cleanUpFunc() {
        return Utils.getData( 'http://overpass-api.de/api/kill_my_queries', null, null, true );
    }

    function getByCoordFunc( coordinates, subkey ) {
        let deferred = Q.defer(),
            query = '[out:json][timeout:25];area[name="România"]->.searchArea;' +
            '(node["tourism"="' + subkey + '"](around.searchArea:100.0,' + coordinates.lat +
            ',' + coordinates.lng + ');' +
            ');out body;>;out skel qt;';
        queryOverpass( query, deferred.makeNodeResolver() );
        return deferred.promise;
    }

    function getByLatLongFunc( coordinates, tag, distance ) {

        let deferred = Q.defer(),
            query = '[out:json];' +
                '(node(around:' + distance + ',' + coordinates.lat +
                ',' + coordinates.lng + ')["'+ tag.overpass.key +'"="' + tag.overpass.value + '"]' +
                ');out body;>;out skel qt;';
        queryOverpass( query, deferred.makeNodeResolver() );
        return deferred.promise;
    }

    function getCityPoisByTagFunc( city, tagId ) {
        return co( function* () {
            let deferred = Q.defer(),
                /* Overpass query [Init] */
                query = '[out:json];' +
                'area[name="' + city + '"]->.a;(',
                tag = yield Tag.findById( tagId ).exec();

            if ( _.isEmpty( tag ) ) {
                return;
            }

            let mainCategory = yield Category.findOne( {
                _id: tag.categoryId
            } ).exec();

            if ( _.isEmpty( mainCategory ) ) {
                return;
            }

            /* Overpass query node constructor */
            query += 'node(area.a)';
            /* Add extra node info for each new key */
            if ( !_.isEmpty( mainCategory.extra ) && !_.isEmpty( mainCategory.extra.node ) ) {
                let extraNode = mainCategory.extra.node;
                extraNode.forEach( node => {
                    query += '[' + node + ']';
                } );
            }
            /* Node ["key"~"^value$"] */
            query += '[' + tag.overpass.key + '~"^' + tag.overpass.value + '$"];';
            /* Overpass query way constructor */
            query += 'way(area.a)';
            /* Add extra way info for each new key */
            if ( !_.isEmpty( mainCategory.extra ) && !_.isEmpty( mainCategory.extra.node ) ) {
                let extraNode = mainCategory.extra.node;
                extraNode.forEach( node => {
                    query += '[' + node + ']';
                } );
            }
            /* Way ["key"~"values"] */
            query += '[' + tag.overpass.key + '~"^' + tag.overpass.value + '$"];';
            /* Overpass query [End] */
            query += ');out body;>;out skel qt;';
            console.log( query );

            queryOverpass( query, deferred.makeNodeResolver() );
            return deferred.promise;
        } );
    }

    function getCityPoisByCategFunc( city, category ) {
        return co( function* () {
            let data = {
                    extra: null,
                    overpass: []
                },
                deferred = Q.defer(),
                /* Overpass query [Init] */
                query = '[out:json];' +
                'area[name="' + city + '"]->.a;(',
                mainCategory = yield Category.findOne( {
                    'name.en': category
                } ).exec();

            if ( _.isEmpty( mainCategory ) ) {
                return;
            }

            if ( !_.isEmpty( mainCategory.extra ) ) {
                data.extra = mainCategory.extra;
            }

            let tags = yield Tag.find( {
                categoryId: mainCategory._id
            } ).exec();

            if ( _.isEmpty( tags ) ) {
                return;
            }

            tags.forEach( tag => {
                let check = _.find( data.overpass, {
                    key: tag.overpass.key
                } );
                if ( _.isEmpty( data.overpass ) || !check ) {
                    data.overpass.push( {
                        key: tag.overpass.key,
                        values: '^' + tag.overpass.value + '$'
                    } );
                } else {
                    check.values += '|^' + tag.overpass.value + '$';
                }
            } );

            /* Flag for extra info */
            let flag = -1;

            data.overpass.map( ( overpass, index ) => {
                /* Overpass query node constructor */
                query += 'node(area.a)';
                /* Add extra node info for each new key */
                if ( ( index > flag ) && !_.isEmpty( data.extra ) && !_.isEmpty( data.extra.node ) ) {
                    let extraNode = data.extra.node;
                    extraNode.forEach( node => {
                        query += '["' + node + '"]';
                    } );
                }
                /* Node ["key"~"values"] */
                query += '["' + overpass.key + '"~"' + overpass.values + '"];';

                /* Overpass query way constructor */
                query += 'way(area.a)';
                /* Add extra way info for each new key */
                if ( ( index > flag ) && !_.isEmpty( data.extra ) && !_.isEmpty( data.extra.way ) ) {
                    let extraWay = data.extra.way;
                    extraWay.forEach( way => {
                        query += '["' + way + '"]';
                    } );
                }
                /* Way ["key"~"values"] */
                query += '["' + overpass.key + '"~"' + overpass.values + '"];';

                // Change flag value
                // Then we know that will come
                // the next Overpass Key
                flag = index;
            } );
            /* Overpass query [End] */
            query += ');out body;>;out skel qt;';
            console.log( query );

            queryOverpass( query, deferred.makeNodeResolver() );
            return deferred.promise;
        } );
    }
};

exports[ '@singleton' ] = true;
exports[ '@require' ] = [
    'libs/utils',
    'libs/settings',
    'libs/lodash',
    'model/categoryModel',
    'model/tagModel'
];
