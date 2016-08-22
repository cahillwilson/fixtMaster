'use strict';

angular.module('fixtApp')
    .controller('dashboardController', function (constantLoader) {

    var vm =  this;
    vm.searchList = constantLoader.defaultObjects.SEARCH_LIST;
   
    function initialized() {
        
    }
    
    vm.onSearchItemClick = function(item){
        console.log(item);
    };
    
    initialized();
         
  });
