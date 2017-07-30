(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('LeagueTableDeleteController',LeagueTableDeleteController);

    LeagueTableDeleteController.$inject = ['$uibModalInstance', 'entity', 'LeagueTable'];

    function LeagueTableDeleteController($uibModalInstance, entity, LeagueTable) {
        var vm = this;

        vm.leagueTable = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LeagueTable.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
