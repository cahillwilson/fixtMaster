'use strict';

angular.module('fixtApp')
  .factory('cardBusiness', function (cardData, handlerLoader, commonUtility,
        constantLoader, objectStorage) {
    
    var cardBusiness = {};
    
    var cardDetails = {};
    cardDetails.nodeId = constantLoader.defaultValues.BLANK_STRING;
    cardDetails.nodeLabel = constantLoader.defaultValues.BLANK_STRING;
    
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

        cardDetails.fields = [];
        
        if (commonUtility.isDefinedObject(cardDetails.customerNodeDetails)) {
            setFinalHeirarcyLabel(cardDetails.customerNodeDetails, 
                constantLoader.nodeTypes.CUSTOMER,
                cardDetails.customerNodeDetails.customerNumber,
                cardDetails.customerNodeDetails.customerName);
        }else if (commonUtility.isDefinedObject(cardDetails.hierarchyNodeDetails)) {
            setFinalHeirarcyLabel(cardDetails.hierarchyNodeDetails, 
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
        if(commonUtility.isDefinedObject(cardDetails.layout)){
            if(commonUtility.isDefinedObject(nodeFields)){
                for(var index=0; index<cardDetails.layout.length; index++){
                    var topFiveRank = 0;
                    if(commonUtility.isDefinedObject(cardDetails.topFive)){
                        if(commonUtility.isDefinedObject(cardDetails.topFive.displayTags)){
                            for(var count=0; count<cardDetails.topFive.displayTags.length; count++){
                                if(cardDetails.topFive.displayTags[count] === 
                                    cardDetails.layout[index].field){
                                    topFiveRank = count + 1;
                                    break;
                                }
                            }
                        }
                    }
                    
                    var children = cardDetails.layout[index].field.split(constantLoader.defaultValues.JSON_DELIMETER);
                    var value = constantLoader.defaultValues.BLANK_STRING;
                    for(var cnt=0; cnt<Object.keys(nodeFields).length; cnt++){
                        if(children.length === 1){
                            if(Object.keys(nodeFields)[cnt] === children[0]){
                                value = nodeFields[Object.keys(nodeFields)[cnt]];
                            }
                        }else if(children.length === 2){
                            if(Object.keys(nodeFields)[cnt] === children[0]){
                                for(var cnt1=0; cnt1<Object.keys(nodeFields[Object.keys(nodeFields)[cnt]]).length; cnt1++){
                                    if(Object.keys(nodeFields[Object.keys(nodeFields)[cnt]])[cnt1] === children[1]){
                                        value = nodeFields[Object.keys(nodeFields)[cnt]][Object.keys(nodeFields[Object.keys(nodeFields)[cnt]])[cnt1]];
                                        break;
                                    }
                                }
                            }
                        }else{
                            break;
                        }
                        if(value !== constantLoader.defaultValues.BLANK_STRING){
                            break;
                        }
                    }
                    
                    cardDetails.fields.push({
                        id: cardDetails.layout[index]._id,
                        nodeType: cardDetails.layout[index].nodeType,
                        field: cardDetails.layout[index].field,
                        category: cardDetails.layout[index].category,
                        column: cardDetails.layout[index].column,
                        row: cardDetails.layout[index].row,
                        displayName: cardDetails.layout[index].displayName,
                        rank: topFiveRank,
                        value: value
                    });
                }
            }
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
