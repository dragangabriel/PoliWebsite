(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('LeagueTableDetailController', LeagueTableDetailController);

    LeagueTableDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'LeagueTable', 'Competition'];

    function LeagueTableDetailController($scope, $rootScope, $stateParams, previousState, entity, LeagueTable, Competition) {
        var vm = this;

        vm.leagueTable = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('poliApp:leagueTableUpdate', function(event, result) {
            vm.leagueTable = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
