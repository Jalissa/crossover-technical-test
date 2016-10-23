angular.module('app.directives', [])

.directive('scroll', ['$window','$timeout', function($window, $timeout){
    return {
        scope:{
          scroll: '&'
        },
        link:function (scope, element, attrs) {

            angular.element($window).bind('scroll', function () {
                if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                    $timeout(function(){
                        scope.scroll();
                    },300);

                }
            });
        }
    };
}]);