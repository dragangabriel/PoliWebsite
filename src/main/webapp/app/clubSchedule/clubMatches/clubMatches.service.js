(function () {
    'use strict';
    angular
        .module('poliApp')
        .factory('Match', Match);

    Match.$inject = ['$resource', 'DateUtils'];

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
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.matchdate = DateUtils.convertLocalDateToServer(copy.matchdate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.matchdate = DateUtils.convertLocalDateToServer(copy.matchdate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
