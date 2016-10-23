angular.module('app.controllers', [])

    //Controller to handle login and logout
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

    $scope.logout = function logout(){
        userService.logout({
            sessionId:  userService.getAuthUser().sessionId
        }, function(response) {
            $state.go('login');
        });
    }

    function resetUser(user){
        user.username = null;
        user.password = null;
    }

}])

.controller('homeController', ['$scope','userService','videoService', '$stateParams',

    function($scope, userService, videoService, $stateParams){

        $scope.videos=[];

        var skip = 0;
        var limit = 10;

        loadVideos(skip, limit);

        $scope.loadVideos = function (){
            skip += 10;
            loadVideos(skip, limit);
        }

        $scope.play = function play(e){
            var video = e.target;
            $.each($('.videoTag').get(), function(index, value){
                value.pause();
            })
            if(video.paused){
                video.play();
            }else{
                video.pause();
            }

        }

        function loadVideos(skip, limit){
            var sessionId = userService.getAuthUser().sessionId;
            videoService.get({skip: skip,limit:limit, sessionId: sessionId},
                function(response){
                    if(response.data.status === constants.status.error){
                        $scope.message = response.data.error;
                        return;
                    }
                    videos = response.data.data;
                    for(var i = 0; i < videos.length; i++) {
                        videos[i].ratingAvg = videoService.getRating(videos[i]);
                        $scope.videos.push(videos[i]);
                    }
                },
                function (err){
                    $scope.message = err.data.error;
                }
            );

        }


}])

.controller('detailController', ['$scope','userService','videoService', '$stateParams',

function($scope, userService, videoService, $stateParams){

    getOne();

    $scope.play = function play(e){
        var video = e.target;
        if(video.paused){
            video.play();
        }else{
            video.pause();
        }

    }

    function getOne(){
        videoService.getOne({
           sessionId: userService.getAuthUser().sessionId,
           videoId: $stateParams.videoId
        }, function(response){
            if(response.data.status === constants.status.error){
                $scope.message = response.data.error;
                return;
            }

            $scope.video = response.data.data;
        }, function(err){
            $scope.message = err.data.error;
        });
    }


}])

.run(['$rootScope', '$state', 'userService',
    function($rootScope, $state, userService) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            var requiresLogin = toState.requiresLogin;
            if (requiresLogin && !userService.getAuthUser().sessionId) {
                event.preventDefault();
                $state.go('login');
            }

        });
    }
])

 