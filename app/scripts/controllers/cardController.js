'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader, cardBusiness, 
        objectStorage, handlerLoader) {
    
    var vm =  this;
    vm.isCardDetailsShow = false;
    vm.isCardExtendShow = false;
    vm.cardDetailsDisplayId = 0;
    vm.cardExtDisplayId = 0;
    vm.title = constantLoader.defaultValues.SANDBOX_TITLE;
    
    vm.cardChildList = [];
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
        if(vm.isCardExtendShow){
            cardBusiness.getCardChildListAsync(nodeId).then(function(response){
                vm.cardChildList = response.data.childDetails;
            }, handlerLoader.exceptionHandler.logError);
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
