(function () {
    'use strict';
    angular
        .module('poliApp')
        .factory('News', News)
        .factory('Match', Match)
        .factory('Partner', Partner)
        .factory('LeagueTable', LeagueTable);

    News.$inject = ['$resource', 'DateUtils'];

    function News($resource, DateUtils) {
        var resourceUrl = 'api/news/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true },
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.createdDate = DateUtils.convertDateTimeFromServer(data.createdDate);
                    }
                    console.log(data);
                    return data;
                }
            }
        });
    }

    function Match($resource, DateUtils) {
        var resourceUrl = 'api/matches/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true },
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.matchdate = DateUtils.convertLocalDateFromServer(data.matchdate);
                    }
                    return data;
                }
            }
        });
    }

    function Partner($resource) {
        var resourceUrl = 'api/partners/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true },
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            }
        });
    }

    function LeagueTable($resource) {
        var resourceUrl = 'api/league-tables/:id';
        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true },
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            }
        });
    }
})();
