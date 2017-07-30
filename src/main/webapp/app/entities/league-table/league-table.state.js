(function() {
    'use strict';

    angular
        .module('poliApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('league-table', {
            parent: 'entity',
            url: '/league-table?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LeagueTables'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/league-table/league-tables.html',
                    controller: 'LeagueTableController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }]
            }
        })
        .state('league-table-detail', {
            parent: 'league-table',
            url: '/league-table/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'LeagueTable'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/league-table/league-table-detail.html',
                    controller: 'LeagueTableDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'LeagueTable', function($stateParams, LeagueTable) {
                    return LeagueTable.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'league-table',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('league-table-detail.edit', {
            parent: 'league-table-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/league-table/league-table-dialog.html',
                    controller: 'LeagueTableDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LeagueTable', function(LeagueTable) {
                            return LeagueTable.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('league-table.new', {
            parent: 'league-table',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/league-table/league-table-dialog.html',
                    controller: 'LeagueTableDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                position: null,
                                teamname: null,
                                played: null,
                                wins: null,
                                draws: null,
                                losses: null,
                                goalsfor: null,
                                goalsagainst: null,
                                points: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('league-table', null, { reload: 'league-table' });
                }, function() {
                    $state.go('league-table');
                });
            }]
        })
        .state('league-table.edit', {
            parent: 'league-table',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/league-table/league-table-dialog.html',
                    controller: 'LeagueTableDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LeagueTable', function(LeagueTable) {
                            return LeagueTable.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('league-table', null, { reload: 'league-table' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('league-table.delete', {
            parent: 'league-table',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/league-table/league-table-delete-dialog.html',
                    controller: 'LeagueTableDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LeagueTable', function(LeagueTable) {
                            return LeagueTable.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('league-table', null, { reload: 'league-table' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
