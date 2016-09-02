'use strict';

angular.module('fixtApp')
    .controller('headerController', function (constantLoader, cardBusiness, 
        handlerLoader, commonUtility, localStorage, defaultObjects) {

    var vm =  this;
    vm.searchText = constantLoader.defaultValues.BLANK_STRING;
    vm.searchList = constantLoader.defaultObjects.SEARCH_LIST;
    vm.searchItemType = constantLoader.defaultValues.SEARCH_TYPE_INIT_VALUE;
   
    function initialized() {
        
    }
    
    vm.onSearchItemChanged = function(item){
        vm.searchItemType = item.value;
    };
    
    vm.onSearchClick = function(){
        handlerLoader.log.info(vm.searchItemType);
        commonUtility.redirectTo(constantLoader.routeList.SANDBOX_LIST);
    };
    
    initialized();
         
  });
