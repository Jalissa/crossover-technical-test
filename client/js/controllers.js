angular.module('app.controllers', [])

    //Controller to handle login and logout
.controller('userController', ['$scope', '$state', 'userService',
function ($scope, $state, userService) {
    $scope.message = null;

    $scope.login = function login(user){
        userService.login(user,
            function(authUser){
                if(authUser.status === constants.status.success){
                    $state.go('home');
                }

                $scope.message = authUser.error;
            },
            function (err){
                $scope.message = err.data.error;
            });
    }
    $scope.username = userService.getAuthUser() ? userService.getAuthUser().username : '';
    $scope.logout = function logout(){

        userService.logout({
            sessionId:  userService.getAuthUser().sessionId
        }, function() {
            $state.go('login');
        });
    }


}])

    //Home Controller deals with video lazy loading in home page
.controller('homeController', ['$scope','userService','videoService', '$stateParams',

    function($scope, userService, videoService, $stateParams){

        $scope.videos=[];

        var skip = 0;
        var limit = 10;

        //loads first 10 videos by default
        loadVideos(skip, limit);

        //state params to reuse home view into detail view
        $scope.showOthers = $stateParams.showOthers;
        $scope.enablePlay = $stateParams.enablePlay;
        $scope.videoClass = $stateParams.videoClass;

        //function called to get more videos
        $scope.loadVideos = function getVideos(){
            //to get the next 10 not loaded videos
            skip += 10;
            loadVideos(skip, limit);
        }

        $scope.play = function play(e){
            var video = e.target;
            //to avoid playing more than one video simultaneously
            $.each($('.videoTag').not('#'+$(video)[0].id).get(), function(index, value){
                value.pause();

            });
            if(video.paused){
                video.play();
            }else{
                video.pause();
            }

        }

        function loadVideos(skip, limit){
            videoService.get({skip: skip,limit:limit, sessionId: userService.getAuthUser().sessionId},
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

    //Detail controller handles detail view
.controller('detailController', ['$scope','userService','videoService', '$stateParams',

function($scope, userService, videoService, $stateParams){

    //state params to reuse home view into detail view
    $scope.showOthers = $stateParams.showOthers;
    $scope.enablePlay = $stateParams.enablePlay;
    $scope.videoClass = $stateParams.videoClass;

    getOne();

    //to play selected video
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
            var oneVideo = response.data.data;
            oneVideo.ratingAvg = videoService.getRating(oneVideo);
            $scope.video = oneVideo;
        }, function(err){
            $scope.message = err.data.error;
        });
    }

    $scope.rate = function rate(){
        videoService.rate({
            rating: $scope.selectedRating,
            videoId: $stateParams.videoId,
            sessionId: userService.getAuthUser().sessionId
        }, function(response){
            if(response.data.status === constants.status.error){
                $scope.message = response.data.error;
                return;
            }

            var rating = response.data.data.ratings;
            $scope.video.ratings = rating;
            $scope.video.ratingAvg = videoService.getRating($scope.video);

        }, function(err){
            $scope.message = err.data.error;
        });
    }


}])

.run(['$rootScope', '$state', 'userService',
    function($rootScope, $state, userService) {
        // to validate there's an auth user navigation through the site
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            var requiresLogin = toState.requiresLogin;
            if (requiresLogin && !userService.getAuthUser()) {
                event.preventDefault();
                $state.go('login');
            }

        });
    }
])

 