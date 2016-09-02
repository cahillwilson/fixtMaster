'use strict';

angular.module('fixtApp')
  .factory('cardBusiness', function (cardData, handlerLoader, commonUtility,
        constantLoader, objectStorage) {
    
    var cardBusiness = {};
    
    var cardDetails = {};
    cardDetails.nodeId = "";
    cardDetails.nodeLabel = "";
    
    function setCardDetailFromResponse(successCallback) {
        cardDetails.parentNodes = [];
        if (commonUtility.isDefinedObject(cardDetails.parentNodeDetails)) {
            if (commonUtility.isDefinedObject(cardDetails.parentNodeDetails.customerExcerpt)) {
                cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.CUSTOMER, 
                        cardDetails.parentNodeDetails.customerExcerpt.customerId,
                        cardDetails.parentNodeDetails.customerExcerpt.customerName));
            }
            if (commonUtility.isDefinedObject(cardDetails.parentNodeDetails.hierarchyExcerpt)) {
                cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.HEIRARCHY, 
                        cardDetails.parentNodeDetails.hierarchyExcerpt.custBillingHierarchyId,
                        cardDetails.parentNodeDetails.hierarchyExcerpt.description));
            }
            if (commonUtility.isDefinedObject(cardDetails.parentNodeDetails.bundleExcerpt)) {
                cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.BUNDLE, 
                        cardDetails.parentNodeDetails.bundleExcerpt.custBillingHierarchyId,
                        cardDetails.parentNodeDetails.bundleExcerpt.description));
            }
            if (commonUtility.isDefinedObject(cardDetails.parentNodeDetails.invoiceExcerpt)) {
                cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.INVOICE, 
                        cardDetails.parentNodeDetails.invoiceExcerpt.custBillingHierarchyId,
                        cardDetails.parentNodeDetails.invoiceExcerpt.description));
            }
            if (commonUtility.isDefinedObject(cardDetails.parentNodeDetails.cdgexcerpt)) {
                cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.CUSTOMER_DEFINED_GRP, 
                        cardDetails.parentNodeDetails.cdgexcerpt.custBillingHierarchyId,
                        cardDetails.parentNodeDetails.cdgexcerpt.description));
            }
            if (commonUtility.isDefinedObject(cardDetails.parentNodeDetails.subAccountExcerpt)) {
                cardDetails.parentNodes.push(
                    setParentLabelInHeirarchy(constantLoader.nodeTypes.SUB_ACCOUNT, 
                        cardDetails.parentNodeDetails.subAccountExcerpt.custBillingHierarchyId,
                        cardDetails.parentNodeDetails.subAccountExcerpt.description));
            }
        }

        cardDetails.topFields = [];
        
        if (commonUtility.isDefinedObject(cardDetails.customerNodeDetails)) {
            setFinalHeirarcyLabel(cardDetails.customerNodeDetails, 
                constantLoader.nodeTypes.CUSTOMER,
                cardDetails.customerNodeDetails.customerNumber,
                cardDetails.customerNodeDetails.customerName);
        }else if (commonUtility.isDefinedObject(cardDetails.hierarchyNodeDetails)) {
            setFinalHeirarcyLabel(cardDetails.bundleNodeDetails, 
                constantLoader.nodeTypes.HEIRARCHY,
                cardDetails.hierarchyNodeDetails.custBillingHierarchyId,
                cardDetails.hierarchyNodeDetails.description);
        }else if (commonUtility.isDefinedObject(cardDetails.bundleNodeDetails)) {
            setFinalHeirarcyLabel(cardDetails.bundleNodeDetails);
        }else if (commonUtility.isDefinedObject(cardDetails.invoiceNodeDetails)) {
            setFinalHeirarcyLabel(cardDetails.invoiceNodeDetails);
        }else if (commonUtility.isDefinedObject(cardDetails.cdgnodeDetails)) {
            setFinalHeirarcyLabel(cardDetails.cdgnodeDetails);
        }else if (commonUtility.isDefinedObject(cardDetails.subAccountNodeDetails)) {
            setFinalHeirarcyLabel(cardDetails.subAccountNodeDetails);
        }else if (commonUtility.isDefinedObject(cardDetails.siteNodeDetails)) {
            setFinalHeirarcyLabel(cardDetails.siteNodeDetails);
        }

        if (cardDetails.parentNodes.length >
            constantLoader.defaultValues.MAX_NODE_TYPE_COUNT) {
            cardDetails.parentNodes.splice(0,
                (cardDetails.parentNodes.length -
                    constantLoader.defaultValues.MAX_NODE_TYPE_COUNT));
        }
        
        objectStorage.cardList.push(cardDetails);
        commonUtility.callback(successCallback);
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
        
        cardDetails.nodeId = type + 
            constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR1 + id;
        cardDetails.nodeLabel = label;

        cardDetails.parentNodes.push(
            cardDetails.nodeId + 
            constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR2 + 
            cardDetails.nodeLabel);

        setTopFiveFields(nodeDetails);
    }
    
    function setTopFiveFields(nodeFields){
        if(commonUtility.isDefinedObject(cardDetails.topFive)){
            for(var cnt=0; cnt<Object.keys(nodeFields).length; cnt++){
                for(var index=0; index<cardDetails.topFive.length; index++){
                    if(cardDetails.topFive[index] === Object.keys(nodeFields)[cnt]){
                        if(cardDetails.topFields.length < 
                            constantLoader.defaultValues.MAX_NODE_FIELD_COUNT){
                            cardDetails.topFields.push({
                                name: Object.keys(nodeFields)[cnt],
                                value: nodeFields[Object.keys(nodeFields)[cnt]]
                            });
                        }
                    }
                }
            };
        }
    }
    
    cardBusiness.getCardDetailsListAsync = function(successCallback) {
        return cardData.getCardDetailsListAsync().then(function (response) {
            cardDetails = response.data[objectStorage.cardList.length];
            setCardDetailFromResponse(successCallback);
        }, handlerLoader.exceptionHandler.logError);
    };
    
    return cardBusiness;
  });
