(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('PositionDetailController', PositionDetailController);

    PositionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Position'];

    function PositionDetailController($scope, $rootScope, $stateParams, previousState, entity, Position) {
        var vm = this;

        vm.position = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('poliApp:positionUpdate', function(event, result) {
            vm.position = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
