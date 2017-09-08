(function () {
    'use strict';

    angular
        .module('poliApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', 'DataUtils', 'News', 'Match', 'Partner', 'LeagueTable', 'ParseLinks', 'AlertService'];

    function HomeController($scope, $state, DataUtils, News, Match, Partner, LeagueTable, ParseLinks, AlertService) {

        var vm = this;

        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadLast3News();
        function loadLast3News() {
            News.query({
                size: 3,
                sort: ['createdDate,desc']
            }, onSuccess, onError);

            function onSuccess(data, headers) {
                vm.news = data;
                $(document).ready(function () {
                    $('.bxslider').bxSlider({
                        auto: true,
                        autoControls: true,
                        pause: 3000,
                        autoControls: false,
                    });
                });
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        loadLast3Matches();
        function loadLast3Matches() {
            Match.query({
                size: 2,
                sort: ['id,desc']
            }, onSuccess, onError);

            function onSuccess(data, headers) {
                vm.matches = data;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }       

        function orderLeagueTable(a, b) {
            if (a.position < b.position)
                return -1;
            if (a.position > b.position)
                return 1;
            return 0;
        }

        $scope.setFontWeight = function (team) {
            if (team.teamname == 'ACSU POLI BUCUREȘTI') {
                return { fontWeight: "bold" }
            }
        }

        loadLeagueTable();
        function loadLeagueTable() {
            LeagueTable.query({
            }, onSuccess, onError);

            function onSuccess(data, headers) {
                data = data.sort(orderLeagueTable);
                var list = [];
                var position = -1;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].teamname == 'ACSU POLI BUCUREȘTI')
                        position = i;
                }

                if (position == 0) {
                    list.push(data[position]);
                    list.push(data[position + 1]);
                    list.push(data[position + 2]);
                } else if (position == data.length - 1) {
                    list.push(data[position - 2]);
                    list.push(data[position - 1]);
                    list.push(data[position]);
                } else
                    if (position != -1) {
                        list.push(data[position - 1]);
                        list.push(data[position]);
                        list.push(data[position + 1]);
                    }

                vm.leagueTables = list;

            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }
    }

})();
