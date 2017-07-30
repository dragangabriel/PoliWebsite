(function() {
    'use strict';

    angular
        .module('poliApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('clubPartners', {
            parent: 'app',
            url: '/clubPartners',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/clubPartners/clubPartners.html',
                    controller: 'ClubPartnersController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
