(function() {
    'use strict';
    angular
        .module('poliApp')
        .factory('Competition', Competition);

    Competition.$inject = ['$resource'];

    function Competition ($resource) {
        var resourceUrl =  'api/competitions/:id';

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
