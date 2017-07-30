(function () {
    'use strict';

    angular
        .module('poliApp')
        .controller('ClubNewsDetailController', ClubNewsDetailController);

    ClubNewsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'News'];

    function ClubNewsDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, News) {
        var vm = this;

        vm.news = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
    }
})();
