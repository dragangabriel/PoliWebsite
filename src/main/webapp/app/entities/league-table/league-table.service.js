(function() {
    'use strict';
    angular
        .module('poliApp')
        .factory('LeagueTable', LeagueTable);

    LeagueTable.$inject = ['$resource'];

    function LeagueTable ($resource) {
        var resourceUrl =  'api/league-tables/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
