'use strict';

angular.module('fixtApp')
    .controller('dashboardController', function (constantLoader, log) {

    var vm =  this;
    vm.searchList = constantLoader.defaultObjects.SEARCH_LIST;
   
    function initialized() {
        
    }
    
    vm.onSearchItemClick = function(item){
        log.info(item);
    };
    
    initialized();
         
  });
