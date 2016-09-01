'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader, cardBusiness, 
        handlerLoader, commonUtility) {

    var vm =  this;
    vm.isCardDetailsShow = false;
    vm.title = constantLoader.defaultValues.SANDBOX_TITLE;
    vm.cardDetails = {};

    function initialized() {
        loadCardDetails();
    }
    
    function loadCardDetails(){
        cardBusiness.getCardDetailsListAsync().then(function(response){
            vm.cardDetails = response.data;
            vm.cardDetails.parentNodes = [];
            if(commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails)){
                if(commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.customerExcerpt)){
                    vm.cardDetails.parentNodes.push("C: " + 
                        vm.cardDetails.parentNodeDetails.customerExcerpt.customerName +
                        " - " +
                        vm.cardDetails.parentNodeDetails.customerExcerpt.customerId);
                }
                if(commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.hierarchyExcerpt)){
                    vm.cardDetails.parentNodes.push("H: " + 
                        vm.cardDetails.parentNodeDetails.hierarchyExcerpt.description +
                        " - " +
                        vm.cardDetails.parentNodeDetails.hierarchyExcerpt.custBillingHierarchyId);
                }
                if(commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.bundleExcerpt)){
                    vm.cardDetails.parentNodes.push("BA: " + 
                        vm.cardDetails.parentNodeDetails.bundleExcerpt.description +
                        " - " +
                        vm.cardDetails.parentNodeDetails.bundleExcerpt.custBillingHierarchyId);
                }
                if(commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.invoiceExcerpt)){
                    vm.cardDetails.parentNodes.push("I: " + 
                        vm.cardDetails.parentNodeDetails.invoiceExcerpt.description +
                        " - " +
                        vm.cardDetails.parentNodeDetails.invoiceExcerpt.custBillingHierarchyId);
                }
                if(commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.cdgexcerpt)){
                    vm.cardDetails.parentNodes.push("CDG: " + 
                        vm.cardDetails.parentNodeDetails.cdgexcerpt.description +
                        " - " +
                        vm.cardDetails.parentNodeDetails.cdgexcerpt.custBillingHierarchyId);
                }
            }
            
            vm.cardDetails.topFields = [];
            
            if(commonUtility.isDefinedObject(vm.cardDetails.invoiceNodeDetails)){
                vm.cardDetails.parentNodes.push(vm.cardDetails.invoiceNodeDetails.nodeType +
                    ": " + 
                    vm.cardDetails.invoiceNodeDetails.nodeLabel);
                vm.cardTitle = vm.cardDetails.invoiceNodeDetails.nodeLabel;
                setTopFiveFields(vm.cardDetails.invoiceNodeDetails);
            }
            if(commonUtility.isDefinedObject(vm.cardDetails.cdgnodeDetails)){
                vm.cardDetails.parentNodes.push(vm.cardDetails.cdgnodeDetails.nodeType +
                    ": " + 
                    vm.cardDetails.cdgnodeDetails.nodeLabel);
                vm.cardTitle = vm.cardDetails.cdgnodeDetails.nodeLabel;
                setTopFiveFields(vm.cardDetails.cdgnodeDetails);
            }
            if(commonUtility.isDefinedObject(vm.cardDetails.subAccountNodeDetails)){
                vm.cardDetails.parentNodes.push(vm.cardDetails.subAccountNodeDetails.nodeType +
                    ": " + 
                    vm.cardDetails.subAccountNodeDetails.nodeLabel);
                vm.cardTitle = vm.cardDetails.subAccountNodeDetails.nodeLabel;
                setTopFiveFields(vm.cardDetails.subAccountNodeDetails);
            }
            
            if(vm.cardDetails.parentNodes.length > 
                constantLoader.defaultValues.MAX_NODE_TYPE_COUNT){
                vm.cardDetails.parentNodes.splice(0, 
                    (vm.cardDetails.parentNodes.length - 
                        constantLoader.defaultValues.MAX_NODE_TYPE_COUNT));
            }
            
            
            
        }, handlerLoader.exceptionHandler.logError);
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
