(function () {
    'use strict';

    angular
        .module('poliApp')
        .config(pagerConfig);

    pagerConfig.$inject = ['uibPagerConfig', 'paginationConstants'];

    function pagerConfig(uibPagerConfig, paginationConstants) {
        uibPagerConfig.itemsPerPage = paginationConstants.itemsPerPage;
        uibPagerConfig.previousText = 'Pagina anterioara';
        uibPagerConfig.nextText = 'Pagina următoare';
    }
})();
