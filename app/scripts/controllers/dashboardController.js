'use strict';

angular.module('fixtApp')    //Was trying to add the card module here
    .controller('dashboardController', function (constantLoader, $log, $scope, $location) {

    var vm =  this;
    vm.searchList = constantLoader.defaultObjects.SEARCH_LIST;
    $scope.dashboard = {};
   
    function initialized() {
        
    }
    
    vm.onSearchItemClick = function(item){
        $scope.dashboard.selectedSandbox = item;
        $log.info(item);
        console.log($scope.dashboard.selectedSandbox);
        $location.url('/sandbox?id=' + item.id);
        // change the route.
    };
    
    initialized();
         
  });
