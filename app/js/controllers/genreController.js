'use strict'
const ctrl=angular.module('genreModule',['ui.router'])

const SERVER='https://webtech-prj-watchmovies-mrnobody22.c9users.io'
ctrl.controller('genreController',['$scope','$http','$state',function($scope, $http, $state){
    let $constructor=()=>{
        $http.get(SERVER+"/genres")
        .then((response)=>{
            $scope.genres=response.data
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    $scope.addGenre=(genre)=>{
        $http.post(SERVER+"/genres",genre)
        .then((response)=>{
            $state.go($state.current,{},{
                reload:true
            })
        })
    }
    var h = window.innerHeight;
    var page = document.getElementById("pageBackground");
    page.style.height = h+"px";
    window.onresize = function(event) {
        h = window.innerHeight;
        page = document.getElementById("pageBackground");
        page.style.height = h+"px";
    };
    $scope.deleteGenre=(genre)=>{
        $http.delete(SERVER+"/genres/"+genre.id)
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
    
    $scope.editGenre=(genre)=>{
        $scope.selected=genre
    }
    $scope.cancelEditing=()=>{
        $scope.selected={}
    }
    $scope.getTemplate=(genre)=>{
        if(genre.id==$scope.selected.id){
            return 'edit'
        }
        return 'display'
    }
    $scope.saveGenre=(genre)=>{
        $http.put(SERVER+'/genres/'+genre.id,genre)
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