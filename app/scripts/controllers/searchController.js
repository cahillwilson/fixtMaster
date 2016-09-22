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
    
    handlerLoader.sessionHandler.set(constantLoader.sessionItems.IS_SHOW_SEARCH_TYPE, false, false);
   
    function initialized() {
        vm.searchText = constantLoader.defaultValues.BLANK_STRING;
        vm.searchTypeText = constantLoader.defaultValues.BLANK_STRING;
        vm.searchCategory = constantLoader.defaultValues.SEARCH_CAT_INIT_VALUE;
        vm.searchType = constantLoader.defaultValues.SEARCH_TYPE_INIT_VALUE;
    }
    
    function setFilterTags(){
        var tags = [];
        if(commonUtility.isDefinedObject(objectStorage.tagList) && objectStorage.tagList.length > 0){
            tags = objectStorage.tagList;
        }
        if(tags.indexOf(handlerLoader.sessionHandler.get(constantLoader.sessionItems.SEARCH_TEXT)) < 0){
            objectStorage.tagList.push(handlerLoader.sessionHandler.get(constantLoader.sessionItems.SEARCH_TEXT));
        }else{
            handlerLoader.modalHandler.showMsg(constantLoader.messages.SEARCH_WITH_SAME_TAG_HEADING,
                constantLoader.messages.SEARCH_WITH_SAME_TAG_MSG);
            return false;
        }
        return true;
    }
    
    vm.onSearchItemChanged = function(item){
        vm.searchCategory = item.value;
    };
    
    vm.onSearchClick = function(){
        var searchType = handlerLoader.sessionHandler.get(constantLoader.sessionItems.SEARCH_TYPE);
        handlerLoader.sessionHandler.set(constantLoader.sessionItems.SEARCH_TEXT, vm.searchText);
        if(commonUtility.is3DValidKey(handlerLoader.sessionHandler.get(
            constantLoader.sessionItems.IS_SHOW_SEARCH_TYPE, false))){
            if(handlerLoader.sessionHandler.get(constantLoader.sessionItems.IS_SHOW_SEARCH_TYPE, false)){
                handlerLoader.sessionHandler.set(constantLoader.sessionItems.SEARCH_TEXT, vm.searchTypeText);
            }
        }
        switch(searchType) {
            case "name":
                if(setFilterTags()){
                    if (commonUtility.getCurrentLocation().indexOf(constantLoader.routeList.SANDBOX_LIST) > -1) {
                        searchBusiness.getSearchSummaryAsync();
                    }
                }
                handlerLoader.sessionHandler.set(constantLoader.sessionItems.IS_SHOW_SEARCH_TYPE, true, false);
                break;
            case "id":
                if (commonUtility.getCurrentLocation().indexOf(constantLoader.routeList.SANDBOX_LIST) > -1) {
                    cardBusiness.getCardDetailsListAsync();
                } 
                handlerLoader.sessionHandler.set(constantLoader.sessionItems.IS_SHOW_SEARCH_TYPE, false, false);
                break;
        }
        if(commonUtility.getCurrentLocation().indexOf(constantLoader.routeList.SANDBOX_LIST) <= -1){            
            commonUtility.redirectTo(constantLoader.routeList.SANDBOX_LIST);            
        }
    };
    initialized();
         
  });
