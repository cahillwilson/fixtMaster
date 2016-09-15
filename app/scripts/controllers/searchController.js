'use strict';

angular.module('fixtApp')
    .controller('searchController', function (constantLoader, cardBusiness, 
        commonUtility, handlerLoader, searchBusiness, objectStorage) {

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
        handlerLoader.sessionHandler.set(constantLoader.sessionItems.SEARCH_TEXT, vm.searchText);
        if(commonUtility.getCurrentLocation().indexOf(constantLoader.routeList.SANDBOX_LIST) > -1){
            searchBusiness.getSearchSummaryAsync();
        }
        else{
            commonUtility.redirectTo(constantLoader.routeList.SANDBOX_LIST);
            searchBusiness.getSearchSummaryAsync();
            
        }
    };
    initialized();
         
  });
