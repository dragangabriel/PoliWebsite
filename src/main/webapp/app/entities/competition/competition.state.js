(function() {
    'use strict';

    angular
        .module('poliApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('competition', {
            parent: 'entity',
            url: '/competition?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Competitions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/competition/competitions.html',
                    controller: 'CompetitionController',
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
        .state('competition-detail', {
            parent: 'competition',
            url: '/competition/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Competition'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/competition/competition-detail.html',
                    controller: 'CompetitionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Competition', function($stateParams, Competition) {
                    return Competition.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'competition',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('competition-detail.edit', {
            parent: 'competition-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/competition/competition-dialog.html',
                    controller: 'CompetitionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Competition', function(Competition) {
                            return Competition.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('competition.new', {
            parent: 'competition',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/competition/competition-dialog.html',
                    controller: 'CompetitionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('competition', null, { reload: 'competition' });
                }, function() {
                    $state.go('competition');
                });
            }]
        })
        .state('competition.edit', {
            parent: 'competition',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/competition/competition-dialog.html',
                    controller: 'CompetitionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Competition', function(Competition) {
                            return Competition.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('competition', null, { reload: 'competition' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('competition.delete', {
            parent: 'competition',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/competition/competition-delete-dialog.html',
                    controller: 'CompetitionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Competition', function(Competition) {
                            return Competition.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('competition', null, { reload: 'competition' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
