(function() {
    'use strict';

    angular
        .module('poliApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('match', {
            parent: 'entity',
            url: '/match?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Matches'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/match/matches.html',
                    controller: 'MatchController',
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
        .state('match-detail', {
            parent: 'match',
            url: '/match/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Match'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/match/match-detail.html',
                    controller: 'MatchDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Match', function($stateParams, Match) {
                    return Match.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'match',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('match-detail.edit', {
            parent: 'match-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/match/match-dialog.html',
                    controller: 'MatchDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Match', function(Match) {
                            return Match.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('match.new', {
            parent: 'match',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/match/match-dialog.html',
                    controller: 'MatchDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                hometeam: null,
                                awayteam: null,
                                homegoals: null,
                                awaygoals: null,
                                location: null,
                                description: null,
                                matchdatetime: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('match', null, { reload: 'match' });
                }, function() {
                    $state.go('match');
                });
            }]
        })
        .state('match.edit', {
            parent: 'match',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/match/match-dialog.html',
                    controller: 'MatchDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Match', function(Match) {
                            return Match.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('match', null, { reload: 'match' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('match.delete', {
            parent: 'match',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/match/match-delete-dialog.html',
                    controller: 'MatchDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Match', function(Match) {
                            return Match.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('match', null, { reload: 'match' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
