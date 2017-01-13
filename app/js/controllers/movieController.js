'use strict'

angular.module('genreModule').controller('movieController',['$scope','$http',function($scope, $http){
    const SERVER='https://webtech-prj-watchmovies-mrnobody22.c9users.io'
    
    let $constructor=()=>{
        $http.get(SERVER+"/movies")
        .then((response)=>{
            $scope.movies=response.data
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    var h = window.innerHeight;
    var page = document.getElementById("pageBackground");
    page.style.height = h+"px";
    window.onresize = function(event) {
        h = window.innerHeight;
        page = document.getElementById("pageBackground");
        page.style.height = h+"px";
    }
    $scope.getTemplate=(movie)=>{
        return 'display'
    }
    
    $constructor();
    return 'display';
}])