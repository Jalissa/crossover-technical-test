angular.module('app.services', ['ngCookies'])

.service('userService', ['$http','$cookies', function($http, $cookies){

    this.login = function login(user, onSuccess, onError){
        user.password = md5(user.password);
        $http.post('/user/auth', user)
            .then(function success(response){
                var authUser = response.data;
                $cookies.put('authUser',authUser);
                onSuccess(authUser);
            }, onError);
    }

    this.getAuthUser = function getAuthUser(){
        return $cookies.get('authUser');
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

}]);