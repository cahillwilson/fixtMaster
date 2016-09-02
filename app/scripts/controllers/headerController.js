'use strict';

angular.module('fixtApp')
    .controller('headerController', function (constantLoader, cardBusiness, 
        commonUtility) {

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
        if(commonUtility.getCurrentLocation().indexOf(constantLoader.routeList.SANDBOX_LIST) > -1){
            cardBusiness.getCardDetailsListAsync();
        }else{
            commonUtility.redirectTo(constantLoader.routeList.SANDBOX_LIST);
        }
    };
    
    initialized();
         
  });
