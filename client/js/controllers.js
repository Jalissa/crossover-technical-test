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

        $scope.videos=[];

        var skip = 0;
        var limit = 10;

        loadVideos(skip, limit);

        $scope.loadVideos = function (){
            skip += 10;
            loadVideos(skip, limit);
        }

        function loadVideos(skip, limit){
            var sessionId = userService.getAuthUser().sessionId;
            videoService.get({skip: skip,limit:limit, sessionId: sessionId},
                function(response){
                    videos = response.data.data;
                    for(var i = 0; i < videos.length; i++) {
                        videos[i].ratingAvg = videoService.getRating(videos[i]);
                        $scope.videos.push(videos[i]);
                    }
                },
                function (err){
                    console.log(err);
                }
            );

        }


}])


 