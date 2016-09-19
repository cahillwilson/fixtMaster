'use strict';

angular.module('fixtApp')
    .controller('searchController', function (constantLoader, cardBusiness, 
        commonUtility, handlerLoader, searchBusiness, objectStorage) {

    var vm =  this;
    vm.searchText = constantLoader.defaultValues.BLANK_STRING;
    vm.searchTypeText = constantLoader.defaultValues.BLANK_STRING;
    vm.searchCategoryList = constantLoader.defaultObjects.SEARCH_LIST_CATEGORY;
    vm.searchTypeList = constantLoader.defaultObjects.SEARCH_LIST_TYPE;
    vm.searchCategory = constantLoader.defaultValues.SEARCH_CAT_INIT_VALUE;
    vm.searchType = constantLoader.defaultValues.SEARCH_TYPE_INIT_VALUE;
    vm.showSearchType = false;
   
    function initialized() {
        
    }
    
    vm.onSearchItemChanged = function(item){
        vm.searchCategory = item.value;
    };
    
    vm.onSearchClick = function(){
        var searchType = handlerLoader.sessionHandler.get(constantLoader.sessionItems.SEARCH_TYPE);
        switch(searchType) {
            case "name":
                if (commonUtility.getCurrentLocation().indexOf(constantLoader.routeList.SANDBOX_LIST) > -1) {
                    searchBusiness.getSearchSummaryAsync();
                }
                vm.showSearchType = true;
                break;
            case "id":
                if (commonUtility.getCurrentLocation().indexOf(constantLoader.routeList.SANDBOX_LIST) > -1) {
                    cardBusiness.getCardDetailsListAsync();
                } 
                break;
        }
        
        handlerLoader.sessionHandler.set(constantLoader.sessionItems.SEARCH_TEXT, vm.searchText);
        if(commonUtility.getCurrentLocation().indexOf(constantLoader.routeList.SANDBOX_LIST) <= -1){            
            commonUtility.redirectTo(constantLoader.routeList.SANDBOX_LIST);            
        }
    };
    initialized();
         
  });
