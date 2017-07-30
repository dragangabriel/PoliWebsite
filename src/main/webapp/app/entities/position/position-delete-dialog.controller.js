(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('PositionDeleteController',PositionDeleteController);

    PositionDeleteController.$inject = ['$uibModalInstance', 'entity', 'Position'];

    function PositionDeleteController($uibModalInstance, entity, Position) {
        var vm = this;

        vm.position = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Position.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
