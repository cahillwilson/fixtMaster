'use strict';

angular.module('routerConfigModule', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
           templateUrl: 'views/dashBoard.html'
        })
        .when('/sandbox?:id',{
           templateUrl: 'views/sandbox-demo.html'
        })
        .otherwise({
            redirectTo: '/'
        });
  }
]);
