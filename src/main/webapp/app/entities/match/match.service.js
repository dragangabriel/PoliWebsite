(function() {
    'use strict';
    angular
        .module('poliApp')
        .factory('Match', Match);

    Match.$inject = ['$resource', 'DateUtils'];

    function Match ($resource, DateUtils) {
        var resourceUrl =  'api/matches/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.matchdatetime = DateUtils.convertDateTimeFromServer(data.matchdatetime);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
