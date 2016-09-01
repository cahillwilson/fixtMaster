'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader, cardBusiness, 
        handlerLoader, commonUtility, localStorage) {

    var vm =  this;
    vm.isCardDetailsShow = false;
    vm.title = constantLoader.defaultValues.SANDBOX_TITLE;
    vm.cardDetails = {};
    vm.cardDetails.nodeId = "";
    vm.cardDetails.nodeLabel = "";

    function initialized() {
        loadCardDetails();
    }
    
    function loadCardDetails() {
        var localCopy = localStorage.getObject("cardDetail");
        
        if (commonUtility.isDefinedObject(localCopy)) {
            vm.cardDetails = localCopy;
            setCardDetailFromResponse();
        } else {
            cardBusiness.getCardDetailsListAsync().then(function (response) {
                vm.cardDetails = response.data;
                localStorage.setObject("cardDetail", vm.cardDetails);
                setCardDetailFromResponse();
            }, handlerLoader.exceptionHandler.logError);
        }
    }
    
    function setCardDetailFromResponse() {
        vm.cardDetails.parentNodes = [];
        if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails)) {
            if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.customerExcerpt)) {
                vm.cardDetails.parentNodes.push("C: " +
                        vm.cardDetails.parentNodeDetails.customerExcerpt.customerId +
                        " - " +
                        vm.cardDetails.parentNodeDetails.customerExcerpt.customerName);
            }
            if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.hierarchyExcerpt)) {
                vm.cardDetails.parentNodes.push("H: " +
                        vm.cardDetails.parentNodeDetails.hierarchyExcerpt.custBillingHierarchyId +
                        " - " +
                        vm.cardDetails.parentNodeDetails.hierarchyExcerpt.description);
            }
            if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.bundleExcerpt)) {
                vm.cardDetails.parentNodes.push("BA: " +
                        vm.cardDetails.parentNodeDetails.bundleExcerpt.custBillingHierarchyId +
                        " - " +
                        vm.cardDetails.parentNodeDetails.bundleExcerpt.description);
            }
            if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.invoiceExcerpt)) {
                vm.cardDetails.parentNodes.push("I: " +
                        vm.cardDetails.parentNodeDetails.invoiceExcerpt.custBillingHierarchyId +
                        " - " +
                        vm.cardDetails.parentNodeDetails.invoiceExcerpt.description);
            }
            if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.cdgexcerpt)) {
                vm.cardDetails.parentNodes.push("CDG: " +
                        vm.cardDetails.parentNodeDetails.cdgexcerpt.custBillingHierarchyId +
                        " - " +
                        vm.cardDetails.parentNodeDetails.cdgexcerpt.description);
            }
        }

        vm.cardDetails.topFields = [];

        if (commonUtility.isDefinedObject(vm.cardDetails.invoiceNodeDetails)) {
            vm.cardDetails.nodeId = vm.cardDetails.invoiceNodeDetails.nodeType + ": " +
                    vm.cardDetails.invoiceNodeDetails.nodeID;
            vm.cardDetails.nodeLabel = vm.cardDetails.invoiceNodeDetails.nodeLabel;

            vm.cardDetails.parentNodes.push(
                    vm.cardDetails.nodeId + " - " + vm.cardDetails.nodeLabel);

            setTopFiveFields(vm.cardDetails.invoiceNodeDetails);
        }
        if (commonUtility.isDefinedObject(vm.cardDetails.cdgnodeDetails)) {
            vm.cardDetails.nodeId = vm.cardDetails.cdgnodeDetails.nodeType +
                    ": " + vm.cardDetails.cdgnodeDetails.nodeID;
            vm.cardDetails.nodeLabel = vm.cardDetails.cdgnodeDetails.nodeLabel;

            vm.cardDetails.parentNodes.push(
                    vm.cardDetails.nodeId + " - " + vm.cardDetails.nodeLabel);

            setTopFiveFields(vm.cardDetails.cdgnodeDetails);
        }
        if (commonUtility.isDefinedObject(vm.cardDetails.subAccountNodeDetails)) {
            vm.cardDetails.nodeId = vm.cardDetails.subAccountNodeDetails.nodeType +
                    ": " + vm.cardDetails.subAccountNodeDetails.nodeID;
            vm.cardDetails.nodeLabel = vm.cardDetails.subAccountNodeDetails.nodeLabel;

            vm.cardDetails.parentNodes.push(
                    vm.cardDetails.nodeId + " - " + vm.cardDetails.nodeLabel);

            setTopFiveFields(vm.cardDetails.subAccountNodeDetails);
        }

        if (vm.cardDetails.parentNodes.length >
                constantLoader.defaultValues.MAX_NODE_TYPE_COUNT) {
            vm.cardDetails.parentNodes.splice(0,
                    (vm.cardDetails.parentNodes.length -
                            constantLoader.defaultValues.MAX_NODE_TYPE_COUNT));
        }
    }
    
    function setTopFiveFields(nodeFields){
        if(commonUtility.isDefinedObject(vm.cardDetails.topFive)){
            for(var cnt=0; cnt<Object.keys(nodeFields).length; cnt++){
                for(var index=0; index<vm.cardDetails.topFive.length; index++){
                    if(vm.cardDetails.topFive[index] === Object.keys(nodeFields)[cnt]){
                        if(vm.cardDetails.topFields.length < 
                            constantLoader.defaultValues.MAX_NODE_FIELD_COUNT){
                            vm.cardDetails.topFields.push({
                                name: Object.keys(nodeFields)[cnt],
                                value: nodeFields[Object.keys(nodeFields)[cnt]]
                            });
                        }
                    }
                }
            };
        }
    }
    
    vm.onCardDetailsClick = function(){
        vm.isCardDetailsShow = !vm.isCardDetailsShow;
    };
    
    vm.onCardHierarchyClick = function(){
        
        
    };
    
    initialized();
         
  });
