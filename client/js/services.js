angular.module('app.services', ['ngCookies'])

.service('userService', ['$http','$cookieStore', function($http, $cookieStore){

    this.login = function login(user, onSuccess, onError){
        user.password = md5(user.password);
        $http.post('/user/auth', user)
            .then(function success(response){
                var authUser = response.data;
                $cookieStore.put('authUser',authUser);
                onSuccess(authUser);
            }, onError);
    }

    this.getAuthUser = function getAuthUser(){
        return $cookieStore.get('authUser');
    }

    this.logout = function logout(query, onSuccess, onError){
        $http({
            url: '/user/logout',
            method: "GET",
            params: query
        }).then(function(response){
            $cookieStore.remove('authUser');
            onSuccess(response);
        }, onError);
    }
}])

.service('videoService', ['$http', function($http){

    this.get = function get(query, onSuccess, onError){
        $http({
            url: '/videos',
            method: "GET",
            params: query
        }).then(onSuccess, onError);
    }

    this.getRating = function getRating(video){
        var ratingSum = 0;

        for(var j = 0; j < video.ratings.length; j++) {
            ratingSum += video.ratings[j];
        }
        var ratingAvg = (ratingSum / video.ratings.length).toFixed(2);
        return ratingAvg;

    }

    this.getOne = function getOne(query, onSuccess, onError){
        $http({
            url: '/video',
            method: "GET",
            params: query
        }).then(onSuccess, onError);
    }

    this.rate = function rate(data, onSuccess, onError){
        $http.post('/video/ratings?sessionId='+data.sessionId,
            data ).then(onSuccess, onError);
    }

}]);