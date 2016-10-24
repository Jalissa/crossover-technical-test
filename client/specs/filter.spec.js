describe('filter tests', function() {

    beforeEach(module('app'));
    it('should return same url',
        inject(function(trustUrlFilter) {
            expect(trustUrlFilter('http:localhost:3000/video/video.mp4').toString()).toEqual('http:localhost:3000/video/video.mp4');
        })
    );

});
