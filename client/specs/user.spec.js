describe('userController testing', function() {
    var userController, scope, state, userService;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($controller, $rootScope, _userService_) {
        scope = $rootScope.$new;
        userService = _userService_;

        userController = $controller('userController',
            {
                $scope: scope,
                $state: state,
                userService: userService
            });

    }));

    it('userController should exist', function() {
        expect(userController).toBeDefined();
        expect(scope.login).toBeDefined();
        expect(scope.logout).toBeDefined();

    });

    it('userController message var should be null', function() {
        expect(scope.message).toBeNull();
    });

    it('userController username should be not null', function() {
        expect(scope.username).not.toBeNull();
    });

    it('userController login', function() {
        spyOn(scope, 'login');

        scope.login({
            username: 'user',
            password:md5('pass')
        });

        expect(scope.login).toHaveBeenCalled();
        expect(scope.message).toBeNull();

    });


});

describe('userService testing', function(){
    var userService;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function(_userService_) {
        userService = _userService_;
        spyOn(userService, 'login');
        spyOn(userService, 'logout');

    }));

    it('userService should exist', function(){
        expect(userService).toBeDefined();
    });

    it('user password should be correctly md5 encrypted', function() {
        var user = {
            username :'user',
            password: 'pass'
        }
        expect(md5(user.password)).toEqual('1a1dc91c907325c69271ddf0c944bc72');
        userService.login(user);
        expect(userService.login).toHaveBeenCalled();
    });

    it('userService getAuthUser should return null', function(){
        expect(userService.getAuthUser()).not.toBeDefined();
    });

    it('after successful login getAuth should not be null', function(){
        userService.login({
            username: 'user',
            password: md5('pass')
        });

        expect(userService.login).toHaveBeenCalled();

        spyOn(userService, 'getAuthUser').and.returnValue(
            {
                username: 'user',
                status: 'success',
                sessionId: 'somehash'
            });

        expect(userService.getAuthUser()).toEqual({
            username: 'user',
            status: 'success',
            sessionId: 'somehash'
        })

    });

    it('userService should logout and getAuthUser should be undefined', function(){
        expect(userService.logout).toBeDefined();
        userService.logout();
        expect(userService.logout).toHaveBeenCalled();
        expect(userService.getAuthUser()).not.toBeDefined();
    });
});