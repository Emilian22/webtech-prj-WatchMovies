'use strict'
angular.module('genreModule').controller('genreMoviesController',['$scope','$http','$stateParams','$state',function($scope, $http, $stateParams, $state){
    const SERVER='https://webtech-prj-watchmovies-mrnobody22.c9users.io'
    
    let $constructor=()=>{
        $http.get(SERVER+'/genres/'+$stateParams.genreId)
        .then((response)=>{
            $scope.genre=response.data
            return $http.get(SERVER+'/genres/'+$stateParams.genreId+'/movies')
        })
        .then((response)=>{
            $scope.movies=response.data
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
    $scope.addMovie=(movie)=>{
        $http.post(SERVER+'/genres/'+$stateParams.genreId+'/movies',movie)
        .then((response)=>{
            $state.go($state.current,{},{
                reload:true
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    $scope.deleteMovie=(movie)=>{
        console.log(SERVER+'/genres/'+$stateParams.genreId+'/movies/'+movie.id);
        $http.delete(SERVER+'/genres/'+$stateParams.genreId+'/movies/'+movie.id)
        .then((response)=>{
            $state.go($state.current,{},{
                reload:true
            })
        })
        .catch((error)=>{
            console.log(error)
        }) 
    }
    $scope.selected={}
    
      $scope.getTemplate=(movie)=>{
        if(movie.id==$scope.selected.id){
            return 'edit'
        }
        else{
        return 'display'
        }
    }
    
    $scope.editMovie=(movie)=>{
        $scope.selected = movie;
    }
    var h = window.innerHeight;
    var page = document.getElementById("pageBackground");
    page.style.height = h+"px";
    window.onresize = function(event) {
        h = window.innerHeight;
        page = document.getElementById("pageBackground");
        page.style.height = h+"px";
    };
    var isShown = false;
    $scope.arata = function () {
        if (isShown) {
            document.getElementById('addMovieForm').style.display = 'none';
            isShown = false;
        } else {
            document.getElementById('addMovieForm').style.display = 'block';
            isShown = true;
        }
    }
     $scope.cancelEditing=()=>{
        $scope.selected={}
    }
    $scope.saveMovie=(movie)=>{
        $http.put(SERVER+ '/genres/' +$stateParams.genreId + '/movies/' + movie.id, movie)
        .then((response)=>{
            $state.go($state.current,{},{
                reload:true
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    $constructor()
}])