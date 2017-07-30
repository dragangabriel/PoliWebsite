(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('CompetitionDialogController', CompetitionDialogController);

    CompetitionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Competition', 'Season'];

    function CompetitionDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Competition, Season) {
        var vm = this;

        vm.competition = entity;
        vm.clear = clear;
        vm.save = save;
        vm.seasons = Season.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.competition.id !== null) {
                Competition.update(vm.competition, onSaveSuccess, onSaveError);
            } else {
                Competition.save(vm.competition, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('poliApp:competitionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
