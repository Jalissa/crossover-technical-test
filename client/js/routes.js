angular.module('app.routes', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
      .state('login', {
       url: '/login',
      templateUrl: 'login.html',
      controller: 'userController'
  })
      .state('home',{
        url:'/home',
        templateUrl: 'home.html',
        controller: 'homeController',
          requiresLogin:true
  })

      .state('detail',{
          url:'/detail/{videoId}',
          templateUrl:'detail.html',
          controller:'detailController',
          requiresLogin:true
  })


$urlRouterProvider.otherwise('/login')

});