'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader, cardBusiness, 
        objectStorage, handlerLoader, localStorage, commonUtility, serviceLoader,
        sandboxBusiness) {
    
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
    
    serviceLoader.interval(saveSandbox, 
        (constantLoader.defaultValues.SANDBOX_SAVE_INTERVAL_IN_MIN * 60 * 1000));
    
    function initialized() {
        loadSandboxes();
        loadCardDetails();
    }
    
    function loadSandboxes(){
        if(objectStorage.SandboxEditId > 0){
            if(vm.sandBoxes.length>0){
                for(var index=0; index<vm.sandBoxes.length; index++){
                    vm.sandBoxes[index].isActive = false;
                }
                if(commonUtility.filterInArray(vm.sandBoxes, {boxId: objectStorage.SandboxEditId}).length>0){
                    vm.title = commonUtility.filterInArray(vm.sandBoxes, 
                        {boxId: objectStorage.SandboxEditId})[0].title;
                    commonUtility.filterInArray(vm.sandBoxes, 
                        {boxId: objectStorage.SandboxEditId})[0].isActive = true;
                    var cards = commonUtility.filterInArray(vm.sandBoxes, 
                        {boxId: objectStorage.SandboxEditId})[0].cards;
                    vm.activeBoxId = objectStorage.SandboxEditId;
                    if(commonUtility.isDefinedObject(cards) && cards.length>0){
                        for(var index=0; index<cards.length; index++){
                            if(commonUtility.is3DValidKey(localStorage.getObject(cards[index]))){
                                objectStorage.cardList.push(localStorage.getObject(cards[index]));
                            }
                        }
                    }
                }
            }
            objectStorage.SandboxEditId = 0;
        }else{
            sandboxBusiness.addSandbox(sandBoxLoadSuccessCall);
            vm.activeBoxId = commonUtility.filterInArray(vm.sandBoxes, 
                {isActive: true})[0].boxId;
        }
    }
    
    function loadCardDetails() {
        if(objectStorage.isSandboxAdded){
            loadSuccessCall();
            objectStorage.isSandboxAdded = false;
        }else{
            cardBusiness.getCardDetailsListAsync(loadSuccessCall, vm.activeBoxId);
        }
    }
    
    function sandBoxLoadSuccessCall(){
        vm.sandBoxes = localStorage.getObject("sandBoxes");
    }
    
    function loadSuccessCall(){
        vm.cards = objectStorage.cardList;
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
    
    initialized();

  });
