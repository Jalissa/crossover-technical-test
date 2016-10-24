angular.module('app.directives', [])

.directive('scroll', ['$window', function($window){
    return {
        restrict: 'A',
        scope:{
            scroll: '&'
        },
        link:function (scope, element, attrs) {
            element.bind('scroll',function(){
                if(Math.round($(this).scrollTop()) + Math.round($(this).outerHeight())  >= this.scrollHeight - 1){
                    scope.$apply(scope.scroll);
                }
            });
        }
    };
}])

.directive('rating',function(){
    return {
        restrict: 'E',
        templateUrl: '../ratings-select.html',
        controller: 'detailController'
    }
})

.directive('logout',[function(){
    return {
        restrict: 'E',
        templateUrl: '../logout.html',
        controller: 'userController'
    };
}]);