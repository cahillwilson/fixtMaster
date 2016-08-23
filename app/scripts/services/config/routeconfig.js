'use strict';

angular.module('routerConfigModule', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
           templateUrl: 'views/dashBoard.html'
        })
         .when('/card', {
           templateUrl: 'views/card.html'
        })
         .when('/sandBox', {
           templateUrl: 'views/sandbox.html'
        })
        .otherwise({
            redirectTo: '/'
        });
  }
]);
