'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader, cardBusiness, 
        handlerLoader, commonUtility) {

    var vm =  this;
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
            }
            if(commonUtility.isDefinedObject(vm.cardDetails.invoiceNodeDetails)){
                vm.cardDetails.parentNodes.push(vm.cardDetails.invoiceNodeDetails.nodeType +
                    ": " + 
                    vm.cardDetails.invoiceNodeDetails.nodeLabel);
                vm.cardTitle = vm.cardDetails.invoiceNodeDetails.nodeLabel;
            }
        }, handlerLoader.exceptionHandler.logError);
    }
    
    initialized();
         
  });
