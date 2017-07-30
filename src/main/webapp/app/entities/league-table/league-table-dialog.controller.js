(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('LeagueTableDialogController', LeagueTableDialogController);

    LeagueTableDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'LeagueTable', 'Competition'];

    function LeagueTableDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, LeagueTable, Competition) {
        var vm = this;

        vm.leagueTable = entity;
        vm.clear = clear;
        vm.save = save;
        vm.competitions = Competition.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.leagueTable.id !== null) {
                LeagueTable.update(vm.leagueTable, onSaveSuccess, onSaveError);
            } else {
                LeagueTable.save(vm.leagueTable, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('poliApp:leagueTableUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
