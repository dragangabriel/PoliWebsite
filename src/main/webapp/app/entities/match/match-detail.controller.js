(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('MatchDetailController', MatchDetailController);

    MatchDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Match', 'Competition'];

    function MatchDetailController($scope, $rootScope, $stateParams, previousState, entity, Match, Competition) {
        var vm = this;

        vm.match = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('poliApp:matchUpdate', function(event, result) {
            vm.match = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
