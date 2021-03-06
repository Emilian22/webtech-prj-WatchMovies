'use strict'
const app = angular.module('moviesApp', [
    'ui.router',
    'genreModule',
    'ngMessages'
])
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home')
    $stateProvider
        .state("home", {
            url: '/home',
            templateUrl: 'views/home.html'
        })
        .state('genres', {
            url: '/genres',
            templateUrl: 'views/genres.html',
            controller: 'genreController'
        })
        .state('genreMovies', {
            url: '/genres/:genreId/movies',
            templateUrl: 'views/genresMovies.html',
            controller: 'genreMoviesController'
        })
        .state('movies', {
            url: '/movies',
            templateUrl: 'views/movies.html',
            controller: 'movieController'
        })
}])
