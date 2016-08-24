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
        .otherwise({
            redirectTo: '/'
        });
  }
]);
