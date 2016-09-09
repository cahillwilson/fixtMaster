'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader, cardBusiness, 
        defaultObjects, objectStorage, handlerLoader) {
    
    var vm =  this;
    vm.isCardDetailsShow = false;
    vm.isCardExtendShow = false;
    vm.cardDetailsDisplayId = 0;
    vm.cardExtDisplayId = 0;
    vm.title = constantLoader.defaultValues.SANDBOX_TITLE;
    
    vm.cardExtended = {};
    vm.myFakeData = defaultObjects.FAKE_DATA;
    
    vm.cards = [];
    
    function initialized() {
        loadCardDetails();
    }
    
    function loadCardDetails() {
//        var localCopy = localStorage.getObject("cards");
//        
//        if (commonUtility.isDefinedObject(localCopy)) {
//            vm.cardDetails = localCopy;
//            setCardDetailFromResponse();
//        } else {
//            cardBusiness.getCardDetailsListAsync().then(function (response) {
//                vm.cardDetails = response.data;
//                localStorage.setObject("cardDetail", vm.cardDetails);
//                setCardDetailFromResponse();
//            }, handlerLoader.exceptionHandler.logError);
//        }
        cardBusiness.getCardDetailsListAsync(loadSuccessCall);
    }
    
    function loadSuccessCall(){
        vm.cards = objectStorage.cardList;
    }
    
    /*function loadCardExtend(){
        vm.localCopy = localStorage.getObject("cardExtended");
        if (commonUtility.isDefinedObject(localCopy)){
            vm.cardDetails = localCopy;
            setCardExtendedFromResponse();
        }else{
            cardExtBusiness.getCardExtendListAsync().then(function(response){
                vm.cardExtended = response.data;
                localStorage.setObject("cardExtended", vm.cardExtended);
                setCardExtendedFromResponse();
            },handlerLoader.exceptionHandler.logError);
        }
    }*/
        
    vm.onCloseClick = function(card){
        vm.cards.splice(vm.cards.indexOf(card), 1);
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
        vm.cardExtDisplayId = nodeId;
        
        vm.isCardDetailsShow = false;
        vm.cardDetailsDisplayId = 0;
    };

    vm.onOpenNewCard = function(id){
        handlerLoader.sessionHandler.set(constantLoader.sessionItems.SEARCH_TEXT, id);
        loadCardDetails();
    };
       
       

    initialized();

    
         
  });
