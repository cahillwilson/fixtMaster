'use strict';

angular.module('fixtApp')
    .controller('dashboardController', function (constantLoader, handlerLoader, 
        commonUtility) {

    var vm =  this;
    vm.searchList = constantLoader.defaultObjects.SEARCH_LIST;
    vm.searchItemType = constantLoader.defaultValues.SEARCH_TYPE_INIT_VALUE;
   
    function initialized() {
        
    }
    
    vm.onSearchItemChanged = function(item){
        vm.searchItemType = item.value;
    };
    
    vm.onSearchClick = function(){
        vm.searchItemType = "";
        handlerLoader.log.info(vm.searchItemType);
        commonUtility.redirectTo(constantLoader.routeList.SANDBOX_LIST);
    };
    
    initialized();
         
  });
