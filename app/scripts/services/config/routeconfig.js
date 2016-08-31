'use strict';

angular.module('routerConfigModule', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/dashBoard.html',
            resolve: {
                go: function(commonUtility){
                    commonUtility.isSearchBoxHide(false);
                }
            }
        })
        .when('/sandbox',{
            templateUrl: 'views/sandboxList.html',
            resolve: {
                go: function(commonUtility){
                    commonUtility.isSearchBoxHide(false);
                }
            }
        })
        .when('/login',{
            templateUrl:'views/login.html',
            resolve: {
                go: function(commonUtility){
                    commonUtility.isSearchBoxHide(true);
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });
  }
]);
