(function() {
    'use strict';

    angular
        .module('app.common')
        .service('overPassAPI', overPassAPI);

    overPassAPI.$inject = ['$http'];

    /* @ngInject */
    function overPassAPI($http) {
        var overPassURL = 'http://overpass-api.de/api/interpreter?data=',
            services = {
                getCities: getCities,
                getHotels: getHotels
            };

        return services;

        function getCities() {
            var data = '[out:json][timeout:25];'+
                    'area[name="România"]->.a;'+
                    '(node(area.a)[place=city];);'+
                    'out body;>;out skel qt;';
            return $http({method: 'GET', url: overPassURL + data});
        }

        function getHotels(area) {
            var data = '[out:json][timeout:25];'+
                    'node[tourism=hotel][name](' +  area  + ');'+
                    'out body;>;out skel qt;';
            return $http({method: 'GET', url: overPassURL + data});
        }
    }
})();
