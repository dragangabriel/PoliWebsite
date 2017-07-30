(function() {
    'use strict';

    angular
        .module('poliApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('clubHistory', {
            parent: 'club',
            url: '/clubHistory',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/club/clubHistory/clubHistory.html',
                    controller: 'ClubHistoryController',
                    controllerAs: 'vm'
                }
            }
        });
    }    
})();
