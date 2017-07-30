(function () {
    'use strict';

    angular
        .module('poliApp')
        .controller('ClubRankingController', ClubRankingController);

    ClubRankingController.$inject = ['$scope', '$state', 'LeagueTable', 'ParseLinks', 'AlertService', 'paginationConstants', 'pagingParams'];

    function ClubRankingController($scope, $state, LeagueTable, ParseLinks, AlertService, paginationConstants, pagingParams) {

        var vm = this;

        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;

        loadAll();

        function loadAll() {
            LeagueTable.query({
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                if (vm.predicate == "id")
                    data.sort(function(x, y) { return x.position > y.position ? 1 : -1; });
                vm.leagueTables = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        $scope.setFontWeight = function (team) {
            if (team.teamname == 'Politehnica București') {
                return { fontWeight: "bold" }
            }
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }
    }
})();
