'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader, cardBusiness, 
        defaultObjects, objectStorage) {

    var vm =  this;
    vm.isCardDetailsShow = false;
    vm.isCardExtendShow = false;
    vm.cardDetailsDisplayId = 0;
    vm.title = constantLoader.defaultValues.SANDBOX_TITLE;
    vm.cardExtended = {};
    vm.cards = [];
    
    var cardDetails = {};
    cardDetails.nodeId = "";
    cardDetails.nodeLabel = "";

    function initialized() {
        loadCardDetails();
    }
    
    function loadCardDetails() {
//        var localCopy = localStorage.getObject("cardDetail");
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
    
    vm.onCardDetailsClick = function(nodeId){
        vm.isCardDetailsShow = !vm.isCardDetailsShow;
        vm.cardDetailsDisplayId = nodeId;
    };
    
    vm.onCardHierarchyClick = function(){
        
        vm.isCardExtendShow = !vm.isCardExtendShow;
    };
vm.myFakeData = defaultObjects.FAKE_DATA;

    
    initialized();
         
  });
