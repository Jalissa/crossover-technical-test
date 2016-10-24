describe('directives testing', function(){

    var compile, scope, directiveElem, userService,videoService ;

    beforeEach(module('app'));
    beforeEach(module('directives.templates'));

    beforeEach(function(){
        inject(function($compile, $rootScope, _userService_, _videoService_){
            compile = $compile;
            scope = $rootScope.$new();
            userService = _userService_;
            videoService = _videoService_;
            spyOn(userService, 'getAuthUser').and.returnValue(
                {
                    username: 'user',
                    status: 'success',
                    sessionId: 'somehash'
                });
        });

    });
    it('logout directive should exist', function(){
        directiveElem = getCompiledElement('<logout></logout>');
        expect(directiveElem.html()).not.toEqual('');
    });

    it('scroll directive should exist', function(){
        directiveElem = getCompiledElement('<div scroll></div>');
        expect(directiveElem).toBeDefined();
    });

    it('scroll directive scroll should be a function', function(){
        directiveElem = getCompiledElement('<div scroll></div>');
        var isolatedScope = directiveElem.isolateScope();
        scope.scroll = jasmine.createSpy('scroll');

        expect(typeof(isolatedScope.scroll)).toEqual('function');
    });


    function getCompiledElement(elem){
        var element = angular.element(elem);
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }
});