'use strict';

angular.module('fixtApp')
    .controller('cardController', function (constantLoader, cardBusiness, 
        handlerLoader, commonUtility, localStorage, defaultObjects) {

    var vm =  this;
    vm.isCardDetailsShow = false;
    vm.isCardExtendShow = false;
    vm.title = constantLoader.defaultValues.SANDBOX_TITLE;
    vm.cardExtended = {};
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

    function loadCardExtend(){
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
    }
    
    function setCardDetailFromResponse() {
        vm.cardDetails.parentNodes = [];
        if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails)) {
            if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.customerExcerpt)) {
                vm.cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.CUSTOMER, 
                        vm.cardDetails.parentNodeDetails.customerExcerpt.customerId,
                        vm.cardDetails.parentNodeDetails.customerExcerpt.customerName));
            }
            if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.hierarchyExcerpt)) {
                vm.cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.HEIRARCHY, 
                        vm.cardDetails.parentNodeDetails.hierarchyExcerpt.custBillingHierarchyId,
                        vm.cardDetails.parentNodeDetails.hierarchyExcerpt.description));
            }
            if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.bundleExcerpt)) {
                vm.cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.BUNDLE, 
                        vm.cardDetails.parentNodeDetails.bundleExcerpt.custBillingHierarchyId,
                        vm.cardDetails.parentNodeDetails.bundleExcerpt.description));
            }
            if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.invoiceExcerpt)) {
                vm.cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.INVOICE, 
                        vm.cardDetails.parentNodeDetails.invoiceExcerpt.custBillingHierarchyId,
                        vm.cardDetails.parentNodeDetails.invoiceExcerpt.description));
            }
            if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.cdgexcerpt)) {
                vm.cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.CUSTOMER_DEFINED_GRP, 
                        vm.cardDetails.parentNodeDetails.cdgexcerpt.custBillingHierarchyId,
                        vm.cardDetails.parentNodeDetails.cdgexcerpt.description));
            }
            if (commonUtility.isDefinedObject(vm.cardDetails.parentNodeDetails.subAccountExcerpt)) {
                vm.cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.SUB_ACCOUNT, 
                        vm.cardDetails.parentNodeDetails.subAccountExcerpt.custBillingHierarchyId,
                        vm.cardDetails.parentNodeDetails.subAccountExcerpt.description));
            }
        }

        vm.cardDetails.topFields = [];
        
        if (commonUtility.isDefinedObject(vm.cardDetails.customerNodeDetails)) {
            setFinalHeirarcyLabel(vm.cardDetails.customerNodeDetails, 
                constantLoader.nodeTypes.CUSTOMER,
                vm.cardDetails.customerNodeDetails.customerNumber,
                vm.cardDetails.customerNodeDetails.customerName);
        }else if (commonUtility.isDefinedObject(vm.cardDetails.hierarchyNodeDetails)) {
            setFinalHeirarcyLabel(vm.cardDetails.bundleNodeDetails, 
                constantLoader.nodeTypes.HEIRARCHY,
                vm.cardDetails.hierarchyNodeDetails.custBillingHierarchyId,
                vm.cardDetails.hierarchyNodeDetails.description);
        }else if (commonUtility.isDefinedObject(vm.cardDetails.bundleNodeDetails)) {
            setFinalHeirarcyLabel(vm.cardDetails.bundleNodeDetails);
        }else if (commonUtility.isDefinedObject(vm.cardDetails.invoiceNodeDetails)) {
            setFinalHeirarcyLabel(vm.cardDetails.invoiceNodeDetails);
        }else if (commonUtility.isDefinedObject(vm.cardDetails.cdgnodeDetails)) {
            setFinalHeirarcyLabel(vm.cardDetails.cdgnodeDetails);
        }else if (commonUtility.isDefinedObject(vm.cardDetails.subAccountNodeDetails)) {
            setFinalHeirarcyLabel(vm.cardDetails.subAccountNodeDetails);
        }else if (commonUtility.isDefinedObject(vm.cardDetails.siteNodeDetails)) {
            setFinalHeirarcyLabel(vm.cardDetails.siteNodeDetails);
        }

        if (vm.cardDetails.parentNodes.length >
                constantLoader.defaultValues.MAX_NODE_TYPE_COUNT) {
            vm.cardDetails.parentNodes.splice(0,
                    (vm.cardDetails.parentNodes.length -
                            constantLoader.defaultValues.MAX_NODE_TYPE_COUNT));
        }
    }
    
    function setParentLabelInHeirarchy(type, id, desc){
        return type + constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR1 + 
            id + constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR2 + desc;
    }
    
    function setFinalHeirarcyLabel(nodeDetails, nodeType, nodeId, nodeLabel){
        var type = constantLoader.defaultValues.BLANK_STRING;
        var id = constantLoader.defaultValues.BLANK_STRING;
        var label = constantLoader.defaultValues.BLANK_STRING;
        
        type = commonUtility.is3DValidKey(nodeType) ? nodeType : nodeDetails.nodeType;
        id = commonUtility.is3DValidKey(nodeType) ? nodeId : nodeDetails.nodeID;
        label = commonUtility.is3DValidKey(nodeType) ? nodeLabel : nodeDetails.nodeLabel;
        
        vm.cardDetails.nodeId = type + 
            constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR1 + id;
        vm.cardDetails.nodeLabel = label;

        vm.cardDetails.parentNodes.push(
            vm.cardDetails.nodeId + 
            constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR2 + 
            vm.cardDetails.nodeLabel);

        setTopFiveFields(nodeDetails);
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

    function setCardExtendedFromResponse(){

       /* vm.cardExtended.childDetails = []; //Referencing the Child Node from GetChildrenAPIresponse.json
        if (commonUtility.isDefinedObject(vm.cardExtended.childDetails)) {
            if (commonUtility.isDefinedObject(vm.cardExtended.childDetails)) {
                   vm.cardExtended.childDetails.push(+"<span class='nodeIcon'><img src='styles/images/Hrchy-child.jpg' width='10' height='10' alt=""/></span>" + 
                    vm.cardExtended.childDetails.customerId.hierarchyPointID )
             }               

        }*/


    }
    
    vm.onCardDetailsClick = function(){
        vm.isCardDetailsShow = !vm.isCardDetailsShow;
    };
    
    vm.onCardHierarchyClick = function(){
        console.log(vm.isCardExtendShow);
        vm.isCardExtendShow = !vm.isCardExtendShow;
    };
vm.myFakeData = defaultObjects.FAKE_DATA;
console.log(vm.myFakeData)
    
    initialized();
         
  });
