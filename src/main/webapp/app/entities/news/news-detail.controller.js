(function () {
    'use strict';

    angular
        .module('poliApp')
        .controller('NewsDetailController', NewsDetailController)
        .filter('to_trusted', ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        }]);

    NewsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'News'];

    function NewsDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, News) {
        var vm = this;

        vm.news = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('poliApp:newsUpdate', function (event, result) {
            vm.news = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
