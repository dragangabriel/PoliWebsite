(function() {
    'use strict';

    angular
        .module('poliApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('clubStadium', {
            parent: 'club',
            url: '/clubStadium',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/club/clubStadium/clubStadium.html',
                    controller: 'ClubStadiumController',
                    controllerAs: 'vm'
                }
            }
        });
    }    
})();
