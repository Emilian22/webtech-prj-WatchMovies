'use strict'
const app=angular.module('moviesApp',[
    'ui.router',
    'genreModule'
    ])
    app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/genres')
        $stateProvider
            .state("home",{
                url:'/home',
                templateUrl:'views/home.html'
            })
            .state('genres',{
                url:'/genres',
                templateUrl:'views/genres.html',
                controller:'genreController'
            })
            .state('genreMovies',{
                url:'/genres/:genreId/movies',
                templateUrl:'views/genresMovies.html',
                controller:'genreMoviesController'
            })
            .state('movies',{
                url:'/movies',
                templateUrl:'views/movies.html',
                controller:'movieController'
            })
    }])
    