(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('PartnerDialogController', PartnerDialogController);

    PartnerDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Partner'];

    function PartnerDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Partner) {
        var vm = this;

        vm.partner = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.partner.id !== null) {
                Partner.update(vm.partner, onSaveSuccess, onSaveError);
            } else {
                Partner.save(vm.partner, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('poliApp:partnerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setImage = function ($file, partner) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        partner.image = base64Data;
                        partner.imageContentType = $file.type;
                    });
                });
            }
        };

    }
})();
