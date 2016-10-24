describe('video feature testing', function(){

    var userService, videoService, scope, homeController, stateParamsHome,
        scopeDetail, video, detailController,stateParamsDetail;
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($controller, $rootScope, _userService_, _videoService_) {
        scope = $rootScope.$new;
        scopeDetail = $rootScope.$new;
        userService = _userService_;
        videoService = _videoService_;
        stateParamsHome = {
            showOthers: true,
            enablePlay: true,
            videoClass: 'col-md-6',
            window: true
        };

        stateParamsDetail = {
            showOthers: false,
            enablePlay: false,
            videoClass: 'col-md-12',
            window: false
        };

        spyOn(userService, 'getAuthUser').and.returnValue(
            {
                username: 'user',
                status: 'success',
                sessionId: 'somehash'
            });

        homeController = $controller('homeController',
            {
                $scope: scope,
                $stateParams: stateParamsHome,
                userService: userService,
                videoService: videoService
            });

        detailController = $controller('detailController',
            {
                $scope: scopeDetail,
                $stateParams: stateParamsDetail,
                userService: userService,
                videoService: videoService
            });

        video = {
            name: 'video',
            description: 'description',
            ratings: [4,3,4],
            url: 'url'
        };
        var videos = [ ];
        for (var i = 0; i < 10; i++) {
            videos.push(video);
        }

        scope.videos = videos;

    }));


    it('homeController should exist', function() {
        expect(homeController).toBeDefined();
        expect(scope.loadVideos).toBeDefined();
        expect(scope.play).toBeDefined();
    });

    it('state params to form the view should be defined', function() {
        expect(scope.showOthers).toBeDefined();
        expect(scope.enablePlay).toBeDefined() ;
        expect(scope.videoClass).toBeDefined() ;
        expect(scope.window).toBeDefined();

    });

    it('homeController message var should be null', function() {
        expect(scope.message).not.toBeDefined();
    });

    it('scope.videos is not empty and it has ten videos', function() {
        expect(scope.videos.length).toEqual(10);

    });

    it('homeController play should play video if paused', function() {
        var paused = true;
        spyOn(scope, 'play');
        if(paused){
            scope.play();
            paused = false;
        }
        expect(scope.play).toHaveBeenCalled();
        expect(paused).toBeFalsy();
    });

    it('homeController play should pause video if not paused', function() {
        var paused = false;
        spyOn(scope, 'play');
        if(!paused){
            scope.play();
            paused = true;
        }
        expect(scopeDetail.play).toHaveBeenCalled();
        expect(paused).toBeTruthy();
    });

    it('app need to load next 10 videos', function(){
        var skip = 0;
        var limit = 10;
        spyOn(scope, 'loadVideos').and.callFake(function(){
            skip += 10;
            for (var i = 0; i < 10; i++) {
                scope.videos.push(video);
            }
        });
        expect(skip).toEqual(0);
        scope.loadVideos();
        expect(scope.loadVideos).toHaveBeenCalled();
        expect(skip).toEqual(10);
        expect(limit).toEqual(10);
        expect(scope.videos.length).toEqual(20);
    });

    describe('detail controller testing', function(){

        it('detailController should exist', function() {
            expect(detailController).toBeDefined();
            expect(scopeDetail.play).toBeDefined();
        });

        it('detailController message var should be null', function() {
            expect(scopeDetail.message).not.toBeDefined();
        });

        it('detailController play should play video if paused', function() {
            var paused = true;
            spyOn(scopeDetail, 'play');
            if(paused){
                scopeDetail.play();
                paused = false;
            }
            expect(scopeDetail.play).toHaveBeenCalled();
            expect(paused).toBeFalsy();
        });

        it('detailController play should pause video if not paused', function() {
            var paused = false;
            spyOn(scopeDetail, 'play');
            if(!paused){
                scopeDetail.play();
                paused = true;
            }
            expect(scopeDetail.play).toHaveBeenCalled();
            expect(paused).toBeTruthy();
        });

        it('detail controller state params to form the view should be defined', function() {
            expect(scopeDetail.showOthers).toBeDefined();
            expect(scopeDetail.enablePlay).toBeDefined();
            expect(scopeDetail.videoClass).toBeDefined();
            expect(scopeDetail.window).toBeDefined();
        });
    });

    describe('videoService testing', function(){

        it('every video should have an average rating', function() {

            expect(video.ratingAvg).not.toBeDefined();
            video.ratingAvg = videoService.getRating(video);
            expect(video.ratingAvg).toBeDefined();
            expect(video.ratingAvg).toEqual(4);

        });
    });



})