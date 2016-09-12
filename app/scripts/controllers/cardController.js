'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader, cardBusiness, 
        objectStorage, handlerLoader, localStorage, commonUtility, serviceLoader) {
    
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
        if(commonUtility.is3DValidKey(localStorage.getObject("sandBoxes"))){
            vm.sandBoxes = localStorage.getObject("sandBoxes");
            if(vm.sandBoxes.length>0){
                if(commonUtility.filterInArray(vm.sandBoxes, {isActive: true}).length>0){
                    vm.title = commonUtility.filterInArray(vm.sandBoxes, {isActive: true})[0].title;
                    var cards = commonUtility.filterInArray(vm.sandBoxes, {isActive: true})[0].cards;
                    vm.activeBoxId = commonUtility.filterInArray(vm.sandBoxes, {isActive: true})[0].boxId;
                    if(commonUtility.isDefinedObject(cards) && cards.length>0){
                        for(var index=0; index<cards.length; index++){
                            if(commonUtility.is3DValidKey(localStorage.getObject(cards[index]))){
                                objectStorage.cardList.push(localStorage.getObject(cards[index]));
                            }
                        }
                    }
                }
            }
        }else{
            vm.sandBoxes.push({
                boxId: 1,
                title: vm.title,
                isActive: true,
                cards: []
            });
            localStorage.setObject("sandBoxes", vm.sandBoxes);
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
    
    function loadSuccessCall(){
        vm.cards = objectStorage.cardList;
    }
    
    function saveSandbox(){
        if(commonUtility.filterInArray(vm.sandBoxes, {isActive: true}).length > 0){
            commonUtility.filterInArray(vm.sandBoxes, {isActive: true})[0].title = vm.title;
            commonUtility.filterInArray(vm.sandBoxes, {isActive: true})[0].cards = [];
            for(var index=0; index<vm.cards.length; index++){
                commonUtility.filterInArray(vm.sandBoxes, 
                    {isActive: true})[0].cards.push(vm.cards[index].id);
            }
        }
        localStorage.setObject("sandBoxes", vm.sandBoxes);
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
        handlerLoader.modalHandler.showMediumHTML("views/sandboxMenu.html");
    };
    
    initialized();

  });
