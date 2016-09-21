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
    vm.sandBoxes = [];
    vm.searchSummary = [];
    vm.nodes = [];
    vm.selectedNodes = [];
    vm.myPromise = [];
    vm.templateUrl = constantLoader.defaultValues.LOADING_TEMPLATE;
    vm.currentRecCount = 0;
    vm.pageItemCount = 0;
    vm.limit = 5;
    
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
        //vm.multiResultPromise = searchBusiness.getSearchSummaryAsync(loadSuccessCall);
        searchBusiness.getSearchSummaryAsync(loadSuccessCall);
    }
    
    function sandBoxLoadSuccessCall(){
        vm.sandBoxes = localStorage.getObject("sandBoxes");
    }
    
    function loadSuccessCall(){
        vm.selectedNodes = [];
        vm.cards = objectStorage.cardList;
        vm.searchSummary = objectStorage.searchSummary;
        if (commonUtility.isDefinedObject(vm.cards)) {
            vm.card = vm.cards[0];
        }
    }
    
    function saveSandbox(){
        sandboxBusiness.saveSandBox(vm.sandBoxes, vm.activeBoxId, vm.title, vm.cards);
    }
    
    vm.onCloseClick = function(card){
        vm.cards.splice(vm.cards.indexOf(card), 1);
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
    
    vm.onQuickViewClick =  function(quickViewItem, index) {
        vm.card = null;
        angular.forEach(objectStorage.searchSummary, function(searchedItem) {
            if(searchedItem.showQuickView) {
                searchedItem.showQuickView = !searchedItem.showQuickView;
            } else if (searchedItem.nodeDetail.nodeID === quickViewItem.nodeID) {
                searchedItem.showQuickView = !searchedItem.showQuickView;
                vm.myPromise[index] = cardBusiness.getCardDetailsListAsync(loadSuccessCall, vm.activeBoxId);
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
    };
    
    vm.onPageChangeClick = function(currentRecCount, pageItemCount){
        vm.currentRecCount = currentRecCount;
        vm.pageItemCount = pageItemCount;
    };
    
    vm.addToSandbox = function() {
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
        handlerLoader.sessionHandler.delete(constantLoader.sessionItems.FILTER_TAGS);
        objectStorage.searchSummary = [];
    };
    
    vm.onDeleteTagClick = function(){
        searchBusiness.getSearchSummaryAsync(loadSuccessCall);
    };
    
    initialized();

  });
