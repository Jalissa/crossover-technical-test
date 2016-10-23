angular.module('app.directives', [])

.directive('scroll', ['$window','$timeout', function($window){
    return {
        restrict: 'A',
        scope:{
            scroll: '&',
            window:'&'
        },
        link:function (scope, element, attrs) {

            if(window){
                angular.element($window).bind('scroll', function () {
                    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                        scope.$apply(scope.scroll);
                    }
                });
            }else{
                element.bind('scroll',function(){
                    if(Math.round($(this).scrollTop()) + Math.round($(this).outerHeight())  >= this.scrollHeight - 10){
                        scope.$apply(scope.scroll);
                    }
                });
            }



        }
    };
}])

.directive('logout',[function(){
    return {
        restrict: 'E',
        templateUrl: '../logout.html',
        controller: 'userController'
    };
}]);