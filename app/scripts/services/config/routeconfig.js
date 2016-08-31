'use strict';

angular.module('routerConfigModule', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
           templateUrl: 'views/dashBoard.html'
        })
        .when('/sandbox',{
           templateUrl: 'views/sandboxList.html'
        })
        .when('/login',{
           templateUrl:'views/login.html'
        })
        .otherwise({
            redirectTo: '/'
        });
  }
]);
