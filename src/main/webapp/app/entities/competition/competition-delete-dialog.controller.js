(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('CompetitionDeleteController',CompetitionDeleteController);

    CompetitionDeleteController.$inject = ['$uibModalInstance', 'entity', 'Competition'];

    function CompetitionDeleteController($uibModalInstance, entity, Competition) {
        var vm = this;

        vm.competition = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Competition.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
