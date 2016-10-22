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