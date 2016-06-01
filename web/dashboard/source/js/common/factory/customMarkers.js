(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('customMarker', customMarker);

    //customMarker.$inject = [];

    /* @ngInject */
    function customMarker() {
        var icon = getDefault(),
            service = {
                bigCity: iconBigCity,
                city: iconCity,
                hotel: iconHotel
            };

        return service;

        function getDefault(type) {
            return {
                type: type || 'extraMarker',
                shape: 'circle',
                prefix: 'fa'
            };
        }

        function iconBigCity() {
            return {
                iconUrl: 'assets/images/icon-bigCity.png',
                iconSize:     [70, 80], // size of the icon
                shadowSize:   [50, 64], // size of the shadow
                iconAnchor:   [35, 79], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -70] // point from which the popup should open relative to the iconAnchor
            };
        }

        function iconCity() {
            icon.icon = 'fa-dot-circle-o';
            icon.markerColor = 'blue-dark';
            return icon;
        }

        function iconHotel() {
            icon.icon = 'fa-bed';
            icon.markerColor = 'pink';
            return icon;
        }
    }
})();
