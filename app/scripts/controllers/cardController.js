'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader, cardBusiness, 
        objectStorage, handlerLoader, localStorage, commonUtility, serviceLoader,
        sandboxBusiness, searchBusiness) {
    
    var vm =  this;
    vm.isCardDetailsShow = false;
    vm.isCardExtendShow = false;
    vm.cardDetailsDisplayId = 0;
    vm.cardExtDisplayId = 0;
    vm.title = constantLoader.defaultValues.SANDBOX_TITLE;
    vm.activeBoxId = 0;
    
    vm.cardChildList = [];
    vm.cards = [];
    vm.quickCard = {};
    vm.sandBoxes = [];
    vm.searchSummary = [];
    vm.nodes = [];
    vm.selectedNodes = [];
    vm.myPromise = [];
    vm.templateUrl = constantLoader.defaultValues.LOADING_TEMPLATE;
    vm.currentRecCount = 0;
    vm.pageItemCount = 0;
    vm.limit = 5;
    vm.filterTags = [];
    
    serviceLoader.interval(saveSandbox, 
        (constantLoader.defaultValues.SANDBOX_SAVE_INTERVAL_IN_SEC * 1000));
    
    function initialized() {
        var searchType = handlerLoader.sessionHandler.get(constantLoader.sessionItems.SEARCH_TYPE);        
        loadSandboxes();
        if (searchType === "name") {
            loadSearchSummary();
        } else {
            loadCardDetails();
        }
    }
    
    function loadSandboxes(){
        if(objectStorage.SandboxEditId > 0){
            sandBoxLoadSuccessCall();
            if(vm.sandBoxes.length>0){
                for(var index=0; index<vm.sandBoxes.length; index++){
                    vm.sandBoxes[index].isActive = false;
                }
                if(commonUtility.filterInArray(vm.sandBoxes, {boxId: objectStorage.SandboxEditId}).length>0){
                    vm.title = commonUtility.filterInArray(vm.sandBoxes, 
                        {boxId: objectStorage.SandboxEditId})[0].title;
                    commonUtility.filterInArray(vm.sandBoxes, 
                        {boxId: objectStorage.SandboxEditId})[0].isActive = true;
                    vm.activeBoxId = objectStorage.SandboxEditId;
                }
                localStorage.setObject("sandBoxes", vm.sandBoxes);
            }
        }else{
            sandboxBusiness.addSandbox(sandBoxLoadSuccessCall);
            vm.activeBoxId = commonUtility.filterInArray(vm.sandBoxes, 
                {isActive: true})[0].boxId;
        }
    }
    
    function loadCardDetails() {
        if (objectStorage.isSandboxAdded) {
            loadSuccessCall();
            objectStorage.isSandboxAdded = false;
        } else {
            vm.singleResultPromise = cardBusiness.getCardDetailsListAsync(loadSuccessCall, vm.activeBoxId);
        }
    }
    
    function loadSearchSummary() {
        searchBusiness.getSearchSummaryAsync(loadSuccessCall);
    }
    
    function sandBoxLoadSuccessCall(){
        vm.sandBoxes = localStorage.getObject("sandBoxes");
    }
    
    function loadSuccessCall(){
        vm.selectedNodes = [];
        vm.cards = objectStorage.cardList;
        vm.searchSummary = objectStorage.searchSummary;
        if(commonUtility.is3DValidKey(objectStorage.quickViewId)){
            vm.quickCard = objectStorage.quickViewCard;
            objectStorage.quickViewId = constantLoader.defaultValues.BLANK_STRING;
        }
        vm.filterTags = objectStorage.tagList;
        setSearchSummaryEnableForCardCount();
    }
    
    function saveSandbox(){
        sandboxBusiness.saveSandBox(vm.sandBoxes, vm.activeBoxId, vm.title, vm.cards);
    }
    
    function setSearchSummaryEnableForCardCount(){
        
        var isAllCardInSandbox = 
            ((vm.cards.length + vm.selectedNodes.length) >= 
                constantLoader.defaultValues.MAX_CARD_IN_SANDBOX);
        
        if(commonUtility.isDefinedObject(vm.searchSummary)){
            for(var index=0; index<vm.searchSummary.length; index++){
                var isAdded = false;
                for(var idx=0; idx<vm.cards.length; idx++){
                    if(vm.cards[idx].id === vm.searchSummary[index].nodeDetail.nodeID){
                        isAdded = true;
                        break;
                    }
                }
                vm.searchSummary[index].isAdded = isAdded;
                if(commonUtility.is3DValidKey(vm.searchSummary[index].isAdded) 
                    && vm.searchSummary[index].isAdded){
                    vm.searchSummary[index].isHideForCount = false;
                }else{
                    if(vm.selectedNodes.length > 0){
                        for(var count=0; count<vm.selectedNodes.length; count++){
                            if(vm.searchSummary[index].nodeDetail.nodeID === vm.selectedNodes[count]){
                                vm.searchSummary[index].isHideForCount = false;
                                break;
                            }else{
                                vm.searchSummary[index].isHideForCount = isAllCardInSandbox;
                            }
                        }
                    }else{
                        vm.searchSummary[index].isHideForCount = isAllCardInSandbox;
                    }
                }
            }
        }
    }
    
    vm.onCloseClick = function(card){
        vm.cards.splice(vm.cards.indexOf(card), 1);
        setSearchSummaryEnableForCardCount();
        vm.onSaveSanboxClick();
    };
    
    vm.onCardDetailsClick = function(nodeId){
        if(nodeId === vm.cardDetailsDisplayId || vm.cardDetailsDisplayId === 0){
            vm.isCardDetailsShow = !vm.isCardDetailsShow;
        }
        vm.cardDetailsDisplayId = nodeId;
        
        vm.isCardExtendShow = false;
        vm.cardExtDisplayId = 0;
    };

    vm.onCardHierarchyClick = function(nodeId){
        if(nodeId === vm.cardExtDisplayId || vm.cardExtDisplayId === 0){
            vm.isCardExtendShow = !vm.isCardExtendShow;
        }
        if(vm.isCardExtendShow){
            cardBusiness.getCardChildListAsync(nodeId).then(function(response){
                vm.cardChildList = response.data.childDetails;
            }, handlerLoader.exceptionHandler.logError);
        }
        vm.cardExtDisplayId = nodeId;
        
        vm.isCardDetailsShow = false;
        vm.cardDetailsDisplayId = 0;
    };

    vm.onOpenNewCardClick = function(id){
        handlerLoader.sessionHandler.set(constantLoader.sessionItems.SEARCH_TEXT, id);
        loadCardDetails();
    };
    
    vm.onSaveSanboxClick = function(){
        saveSandbox();
    };
    
    vm.onClearAllClick = function(){
        if(commonUtility.filterInArray(vm.sandBoxes, {isActive: true}).length){
            vm.cards = [];
            commonUtility.filterInArray(vm.sandBoxes, 
                {isActive: true})[0].cards = [];
        }
        localStorage.setObject("sandBoxes", vm.sandBoxes);
        objectStorage.cardList = [];
        loadSuccessCall();
        setSearchSummaryEnableForCardCount();
    };
    
    vm.onSanboxMenuClick = function(){
        commonUtility.redirectTo(constantLoader.routeList.DASHBOARD);
    };
    
    vm.onDeleteClick = function(){
        handlerLoader.modalHandler.showConfirm(
            commonUtility.replaceString(constantLoader.messages.SANDBOX_DELETE_HEADING,
                constantLoader.defaultValues.SANDBOX_REPLACABLE_NAME, vm.title),
            commonUtility.replaceString(constantLoader.messages.SANDBOX_DELETE_MSG,
                constantLoader.defaultValues.SANDBOX_REPLACABLE_NAME, vm.title)).then(function(response){
            if(response > 0){
                sandboxBusiness.deleteSandbox(vm.cards, vm.activeBoxId, vm.sandBoxes);
                vm.activeBoxId = 0;
                commonUtility.redirectTo(constantLoader.routeList.DASHBOARD);
            }
        });
    };
    
    vm.onQuickViewClick =  function(quickViewItem, index, nodeId) {
        objectStorage.quickViewId = nodeId;
        angular.forEach(objectStorage.searchSummary, function(searchedItem) {
            if(searchedItem.showQuickView) {
                searchedItem.showQuickView = !searchedItem.showQuickView;
            } else if (searchedItem.nodeDetail.nodeID === quickViewItem.nodeID) {
                searchedItem.showQuickView = !searchedItem.showQuickView;
                vm.myPromise[index] = 
                    cardBusiness.getCardDetailsListAsync(loadSuccessCall, 
                        vm.activeBoxId);
            }
        });
    };
    
    vm.onSelectNode = function (qId) {
        var nodeIndex = vm.selectedNodes.indexOf(qId);
        if (vm.nodes[qId]) {
            vm.selectedNodes.push(qId);
        } else {
            vm.selectedNodes.splice(nodeIndex, 1);
        }
        setSearchSummaryEnableForCardCount();
    };
    
    vm.onPageChangeClick = function(currentRecCount, pageItemCount){
        vm.currentRecCount = currentRecCount;
        vm.pageItemCount = pageItemCount;
    };
    
    vm.addToSandbox = function() {
        objectStorage.quickViewId = constantLoader.defaultValues.BLANK_STRING;
        if(commonUtility.isDefinedObject(vm.selectedNodes) && vm.selectedNodes.length > 0) {
            cardBusiness.addMultipleCards(vm.selectedNodes, vm.activeBoxId, addMultipleCardsSuccessCall);
        }
    };
    
    function addMultipleCardsSuccessCall() {
        var result;
        for(var i = 0; i < vm.selectedNodes.length; i++) {
            result = commonUtility.filterInArray(objectStorage.searchSummary, 
                        {nodeDetail: {nodeID: vm.selectedNodes[i]}})[0];
            result.isAdded = true;
        }
        loadSuccessCall();
    }
    
    vm.onCloseSearchSummary = function(){
        handlerLoader.sessionHandler.set(constantLoader.sessionItems.IS_SHOW_SEARCH_TYPE, false, false);
        objectStorage.tagList = [];
        vm.filterTags = objectStorage.tagList;
        objectStorage.searchSummary = [];
        serviceLoader.rootScope.$broadcast(constantLoader.eventList.RESET_SEARCH_BOX);
    };
    
    vm.onDeleteTagClick = function(tag){
        if (commonUtility.isDefinedObject(objectStorage.tagList) && objectStorage.tagList.length > 1) {
            objectStorage.tagList.splice(objectStorage.tagList.indexOf(tag), 1);
        }
        searchBusiness.getSearchSummaryAsync(loadSuccessCall);
    };
    
    vm.onClearTagsClick = function(){
        if (commonUtility.isDefinedObject(objectStorage.tagList) && objectStorage.tagList.length > 1) {
            for (var index = objectStorage.tagList.length - 1; index >= 1; index--) {
                objectStorage.tagList.splice(objectStorage.tagList.indexOf(objectStorage.tagList[index]), 1);
            }
        }
        searchBusiness.getSearchSummaryAsync(loadSuccessCall);
    };
    
    initialized();

  });
