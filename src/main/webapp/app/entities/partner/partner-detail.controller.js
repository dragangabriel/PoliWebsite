(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('PartnerDetailController', PartnerDetailController);

    PartnerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Partner'];

    function PartnerDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Partner) {
        var vm = this;

        vm.partner = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('poliApp:partnerUpdate', function(event, result) {
            vm.partner = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
