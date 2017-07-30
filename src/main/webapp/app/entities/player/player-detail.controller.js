(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('PlayerDetailController', PlayerDetailController);

    PlayerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Player', 'Position'];

    function PlayerDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Player, Position) {
        var vm = this;

        vm.player = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('poliApp:playerUpdate', function(event, result) {
            vm.player = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
