angular.module('app.controllers', [])
  
.controller('userController', ['$scope', '$state', 'userService',
function ($scope, $state, userService) {
    $scope.message = null;
    $scope.login = function login(user){
        userService.login(user,
            function(authUser){
                resetUser(user);
                if(authUser.status === constants.status.success){
                    $state.go('home');
                }

                $scope.message = authUser.error;
            },
            function (err){
                resetUser(user);
                $scope.message = err.data.error;
            });
    }

    function resetUser(user){
        user.username = null;
        user.password = null;
    }

}])

.controller('homeController', ['$scope','userService','videoService',

    function($scope, userService, videoService){

        $scope.videos = [];
       var sessionId = userService.getAuthUser().sessionId;
        videoService.get({skip:0,limit:10, sessionId: sessionId},
            function(response){
                $scope.videos = response.data;
            },
            function (err){

            }
        );

}])

 