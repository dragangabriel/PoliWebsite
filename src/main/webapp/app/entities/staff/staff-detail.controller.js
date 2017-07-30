(function() {
    'use strict';

    angular
        .module('poliApp')
        .controller('StaffDetailController', StaffDetailController);

    StaffDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Staff', 'Job'];

    function StaffDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Staff, Job) {
        var vm = this;

        vm.staff = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('poliApp:staffUpdate', function(event, result) {
            vm.staff = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
