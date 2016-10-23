angular.module('app.directives', [])

.directive('scroll', ['$window','$timeout', function($window){
    return {
        scope:{
          scroll: '&'
        },
        link:function (scope, element, attrs) {

            angular.element($window).bind('scroll', function () {
                if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                    scope.$apply(scope.scroll);
                }
            });
        }
    };
}])

.directive('logout',[function(){
    return {
        restrict: 'E',
        templateUrl: '../logout.html',
        controller: ''
    };
}]);