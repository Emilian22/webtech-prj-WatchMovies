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
                template:'<h3>Welcome to my movie collection</h3>'
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
    }])
    