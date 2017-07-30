(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('MatchDialogController', MatchDialogController);

    MatchDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Match', 'Competition'];

    function MatchDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Match, Competition) {
        var vm = this;

        vm.match = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
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
            if (vm.match.id !== null) {
                Match.update(vm.match, onSaveSuccess, onSaveError);
            } else {
                Match.save(vm.match, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('poliApp:matchUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.matchdatetime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
