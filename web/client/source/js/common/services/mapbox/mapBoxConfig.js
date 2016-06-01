(function() {
    'use strict';

    angular
        .module('app.common')
        .service('mapBox', mapBox);

    mapBox.$inject = [];

    /* @ngInject */
    function mapBox() {
        var services = {
            name: getName,
            type: getType,
            url: getURL,
            stylers: getStyle,
            options: getOptions,
            coordonates: getCoordonates,
            maxbounds: getMaxBounds,
            config: getConfig
        };

        return services;

        function getName(name) {
            return name || 'Cuba';
        }

        function getType(type) {
            return type || 'xyz';
        }

        function getURL() {
            return 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}';
        }

        function getStyle() {
            return 'mapbox://styles/dabo2100/cik3o8jcu000k9um622amr2rz';
        }

        function getOptions() {
            return {
                apikey: 'pk.eyJ1IjoiZGFibzIxMDAiLCJhIjoiY2lqdWN4emY5MGV2NXR1bTh1eGE2cGY1aCJ9.VaNHV4H0Z1Pd3U0dj6Jrrg',
                mapid: 'dabo2100.8t04sfcz' //dabo2100.p06j9617
            };
        }

        function getCoordonates(latitude, longitude, mapzoom) {
            return {
                lat: latitude || 21.749,
                lng: longitude || -79.673,
                zoom: mapzoom || 7
            };
        }

        function getMaxBounds(nE, sW) {
            // bbox coordonates order
            // [bbox = -84.9417, 19.4335, -73.42803, 23.74317]
            //           nE-lng,  nE-lat,   sW-lng,   sW-lat
            return {
                northEast: {
                    lat: (nE) ? nE.lat : 19.4335,
                    lng: (nE) ? nE.lng : -84.9417
                },
                southWest: {
                    lat: (sW) ? sW.lat : 23.74317,
                    lng: (sW) ? sW.lng : -73.42803
                }
            };
        }

        function getConfig() {
            return {
                name: getName(),
                type: getType(),
                url: getURL(),
                options: getOptions(),
                coordonates: getCoordonates()
            };
        }
    }
})();
