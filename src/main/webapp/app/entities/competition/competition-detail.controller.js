(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('CompetitionDetailController', CompetitionDetailController);

    CompetitionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Competition', 'Season'];

    function CompetitionDetailController($scope, $rootScope, $stateParams, previousState, entity, Competition, Season) {
        var vm = this;

        vm.competition = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('poliApp:competitionUpdate', function(event, result) {
            vm.competition = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
