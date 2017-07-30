(function() {
    'use strict';

    angular
        .module('poliApp')
        .config(paginationConfig);

    paginationConfig.$inject = ['uibPaginationConfig', 'paginationConstants'];

    function paginationConfig(uibPaginationConfig, paginationConstants) {
        uibPaginationConfig.itemsPerPage = paginationConstants.itemsPerPage;
        uibPaginationConfig.maxSize = 5;
        uibPaginationConfig.boundaryLinks = true;
        uibPaginationConfig.firstText = 'Prima pagina';
        uibPaginationConfig.previousText = 'Pagina anterioara';
        uibPaginationConfig.nextText = 'Pagina următoare';
        uibPaginationConfig.lastText = 'Ultima pagina';
    }
})();
