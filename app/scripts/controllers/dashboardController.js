'use strict';

angular.module('fixtApp')
    .controller('dashboardController', function (constantLoader, handlerLoader, 
        commonUtility) {

    var vm =  this;
    vm.searchList = constantLoader.defaultObjects.SEARCH_LIST;
    vm.searchItem = {};
    vm.searchItem.value = constantLoader.defaultValues.SEARCH_TYPE_INIT_VALUE;
   
    function initialized() {
        
    }
    
    vm.onSearchItemChanged = function(item){
        vm.searchItem = item;
    };
    
    vm.onSearchClick = function(){
        handlerLoader.log.info(vm.searchItem);
        commonUtility.redirectTo(constantLoader.routeList.SANDBOX_LIST);
    };
    
    initialized();
         
  });
