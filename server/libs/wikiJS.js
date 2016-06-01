'use strict';

let Wiki = require( 'wikijs' ),
    WikiJS = new Wiki();

exports = module.exports = () => {
    return {
        getPageImages: function* ( title ) {
            let page = yield WikiJS.page( title );
            if ( page ) {
                return page.images();
            }
            return null;
        },
        getPageDetails: function* ( title ) {
            let page = yield WikiJS.page( title );
            if ( page ) {
                return page;
            }
            return null;
        },
        getByGeoLocation: function* ( coordinates ) {
            console.log( coordinates );
            let page = yield WikiJS.geoSearch( coordinates.lat, coordinates.lng, 300 );
            if ( page ) {
                return page;
            }
            return null;
        }
    };
};
exports[ '@singleton' ] = true;
