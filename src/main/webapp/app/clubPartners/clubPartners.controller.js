(function () {
    'use strict';

    angular
        .module('poliApp')
        .controller('ClubPartnersController', ClubPartnersController);

    ClubPartnersController.$inject = ['$state', 'DataUtils', 'Partner', 'ParseLinks', 'AlertService'];

    function ClubPartnersController($state, DataUtils, Partner, ParseLinks, AlertService) {

        var vm = this;
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Partner.query({
            }, onSuccess, onError);
            function onSuccess(data, headers) {
                vm.partners = data;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

    }
})();
