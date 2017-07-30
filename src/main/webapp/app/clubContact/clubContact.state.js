(function() {
    'use strict';

    angular
        .module('poliApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('clubContact', {
            parent: 'app',
            url: '/clubContact',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/clubContact/clubContact.html',
                    controller: 'ClubContactController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
