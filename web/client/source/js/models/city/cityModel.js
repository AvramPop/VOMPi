(function() {
    'use strict';

    angular
        .module('app.models')
        .service('cityModel', cityModel);

    cityModel.$inject = ['Restangular'];

    /* @ngInject */
    function cityModel(Restangular) {
        var baseCityURL = Restangular.all('city'),
            routes = {
                getAll: getCities
            };

        return routes;

        function getCities() {
            return baseCityURL.customGET().then(function(resp) {
                return resp.data;
            });
        }
    }
})();
