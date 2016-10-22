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
        controller: 'homeController'
  })


$urlRouterProvider.otherwise('/login')

});