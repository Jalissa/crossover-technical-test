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
          requiresLogin:true,
          params:{
              videoClass:'col-md-6',
              showOthers: true,
              enablePlay: true
          },
  })

      .state('detail',{
          url:'/detail/{videoId}',
          requiresLogin:true,
          params:{
              videoClass:'col-md-12',
              showOthers: false,
              enablePlay: false
          },
          views: {
              '':{
                  templateUrl:'detail.html',
                  controller:'detailController'
              },
              'videosList@detail':{
                  templateUrl: 'home.html',
                  controller: 'homeController'
              }
          }

  })

// when entering to a not configured state redirects to login
$urlRouterProvider.otherwise('/login')

});