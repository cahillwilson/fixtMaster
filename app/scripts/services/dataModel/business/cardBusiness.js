'use strict';

angular.module('fixtApp')
  .factory('cardBusiness', function (cardData, handlerLoader, commonUtility,
        constantLoader, objectStorage, localStorage, serviceLoader) {
    
    var cardBusiness = {};
    
    var cardDetails = {};
    cardDetails.id = constantLoader.defaultValues.BLANK_STRING;
    cardDetails.nodeId = constantLoader.defaultValues.BLANK_STRING;
    cardDetails.nodeLabel = constantLoader.defaultValues.BLANK_STRING;
    cardDetails.boxId = constantLoader.defaultValues.BLANK_STRING;
    
    function setCardDetailFromResponse(successCallback, activeSanboxId) {
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
            setFinalHeirarcyLabel(activeSanboxId, cardDetails.customerNodeDetails, 
                constantLoader.nodeTypes.CUSTOMER,
                cardDetails.customerNodeDetails.customerNumber,
                cardDetails.customerNodeDetails.customerName);
        }else if (commonUtility.isDefinedObject(cardDetails.hierarchyNodeDetails)) {
            setFinalHeirarcyLabel(activeSanboxId, cardDetails.hierarchyNodeDetails, 
                constantLoader.nodeTypes.HEIRARCHY,
                cardDetails.hierarchyNodeDetails.custBillingHierarchyId,
                cardDetails.hierarchyNodeDetails.description);
        }else if (commonUtility.isDefinedObject(cardDetails.bundleNodeDetails)) {
            setFinalHeirarcyLabel(activeSanboxId, cardDetails.bundleNodeDetails);
        }else if (commonUtility.isDefinedObject(cardDetails.invoiceNodeDetails)) {
            setFinalHeirarcyLabel(activeSanboxId, cardDetails.invoiceNodeDetails);
        }else if (commonUtility.isDefinedObject(cardDetails.cdgnodeDetails)) {
            setFinalHeirarcyLabel(activeSanboxId, cardDetails.cdgnodeDetails);
        }else if (commonUtility.isDefinedObject(cardDetails.subAccountNodeDetails)) {
            setFinalHeirarcyLabel(activeSanboxId, cardDetails.subAccountNodeDetails);
        }else if (commonUtility.isDefinedObject(cardDetails.siteNodeDetails)) {
            setFinalHeirarcyLabel(activeSanboxId, cardDetails.siteNodeDetails);
        }

        if (cardDetails.parentNodes.length >
            constantLoader.defaultValues.MAX_NODE_TYPE_COUNT) {
            cardDetails.parentNodes.splice(0,
                (cardDetails.parentNodes.length -
                    constantLoader.defaultValues.MAX_NODE_TYPE_COUNT));
        }
        
        localStorage.setObject(cardDetails.id, cardDetails);
        if(commonUtility.is3DValidKey(objectStorage.quickViewId)){
            objectStorage.quickViewCard = cardDetails;
        }else{
            objectStorage.cardList.push(cardDetails);
        }
        commonUtility.callback(successCallback);
    }
    
    function setParentLabelInHeirarchy(type, id, desc){
        return type + constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR1 + 
            id + constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR2 + desc;
    }
    
    function setFinalHeirarcyLabel(activeSanboxId, nodeDetails, nodeType, nodeId, nodeLabel){
        var type = constantLoader.defaultValues.BLANK_STRING;
        var id = constantLoader.defaultValues.BLANK_STRING;
        var label = constantLoader.defaultValues.BLANK_STRING;
        
        type = commonUtility.is3DValidKey(nodeType) ? nodeType : nodeDetails.nodeType;
        id = commonUtility.is3DValidKey(nodeType) ? nodeId : nodeDetails.nodeID;
        label = commonUtility.is3DValidKey(nodeType) ? nodeLabel : nodeDetails.nodeLabel;
        
        cardDetails.id = id;
        cardDetails.nodeId = type + 
            constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR1 + id;
        cardDetails.nodeLabel = label;
        cardDetails.boxId = activeSanboxId;

        cardDetails.parentNodes.push(
            cardDetails.nodeId + 
            constantLoader.defaultValues.HEIRARCHY_LABEL_SEPARATOR2 + 
            cardDetails.nodeLabel);

        setTopFiveFields(nodeDetails);
    }
    
    function setTopFiveFields(nodeFields){
        cardDetails.categoryList = [];
        if(commonUtility.isDefinedObject(cardDetails.layout)){
            if(commonUtility.isDefinedObject(nodeFields)){
                for(var index=0; index<cardDetails.layout.length; index++){
                    if(commonUtility.filterInArray(cardDetails.categoryList, 
                        cardDetails.layout[index].category).length === 0){
                        cardDetails.categoryList.push({
                            category: cardDetails.layout[index].category,
                            colCount: cardDetails.layout[index].column,
                            cols: []
                        });
                        cardDetails.categoryList[cardDetails.categoryList.length-1].cols.push({
                            col: cardDetails.layout[index].column,
                            cat: cardDetails.layout[index].category
                        });
                    }else{
                        for(var cnt=0; cnt<cardDetails.categoryList.length; cnt++){
                            if(cardDetails.categoryList[cnt].category === cardDetails.layout[index].category){
                                if(cardDetails.categoryList[cnt].colCount < cardDetails.layout[index].column){
                                    cardDetails.categoryList[cnt].colCount = cardDetails.layout[index].column;
                                    cardDetails.categoryList[cnt].cols.push({
                                        col: cardDetails.layout[index].column,
                                        cat: cardDetails.layout[index].category
                                    });
                                }
                            }
                        }
                    }
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
    
    function setCard(activeSanboxId, cardId){
        var card = localStorage.getObject(cardId);
        if(commonUtility.is3DValidKey(card.boxId)){
            card.boxId = activeSanboxId;
        }
        return card;
    }
    
    function isCardCountAcceptable(activeSanboxId){
        if(objectStorage.SandboxEditId > 0){
            return true;
        }
        if(commonUtility.is3DValidKey(objectStorage.quickViewId)){
            return true;
        }
        if(commonUtility.filterInArray(objectStorage.cardList, 
            {boxId: activeSanboxId}).length > 0){
            if(commonUtility.filterInArray(objectStorage.cardList, 
                {boxId: activeSanboxId}).length > (constantLoader.defaultValues.MAX_CARD_IN_SANDBOX-1)){
                handlerLoader.modalHandler.showMsg(
                    commonUtility.replaceString(constantLoader.messages.MAX_CARD_ERROR_HEADING,
                        constantLoader.defaultValues.CARD_COUNT_REPLACABLE_TEXT, 
                        constantLoader.defaultValues.MAX_CARD_IN_SANDBOX), 
                    commonUtility.replaceString(constantLoader.messages.MAX_CARD_ERROR_MSG,
                        constantLoader.defaultValues.CARD_COUNT_REPLACABLE_TEXT, 
                        constantLoader.defaultValues.MAX_CARD_IN_SANDBOX));
                return false;
            }
        }
        return true;
    }
    
    function getCardFromMemory(activeSanboxId, cardId){
        if(commonUtility.is3DValidKey(localStorage.getObject(cardId))){
            if(commonUtility.isDefinedObject(objectStorage.cardList) && 
                objectStorage.cardList.length > 0){
                if(commonUtility.filterInArray(objectStorage.cardList, 
                    {id: cardId, 
                        boxId: activeSanboxId}).length === 0){
                    if(commonUtility.is3DValidKey(objectStorage.quickViewId)){
                        objectStorage.quickViewCard = setCard(activeSanboxId, cardId);
                    }else{
                        objectStorage.cardList.push(setCard(activeSanboxId, cardId)); 
                    }
                }
            }else{
                if(commonUtility.is3DValidKey(objectStorage.quickViewId)){
                    objectStorage.quickViewCard = setCard(activeSanboxId, cardId);
                }else{
                    objectStorage.cardList.push(setCard(activeSanboxId, cardId));
                }
            }
            return true;
        }
        return false;
    }
    
    function getCardFromDB(activeSanboxId, successCallback, cardId){
        return cardData.getCardDetailsListAsync().then(function (response) {
            return serviceLoader.timeout(function() {
                var cards = commonUtility.filterInArray(response.data, 
                    {subAccountNodeDetails: {
                        nodeID: cardId}});
                if(commonUtility.isDefinedObject(cards) && cards.length > 0){
                    var existCard = [];
                    if(commonUtility.isDefinedObject(objectStorage.cardList) && objectStorage.cardList.length > 0){
                        existCard = commonUtility.filterInArray(objectStorage.cardList, 
                            {nodeId: cards[0].subAccountNodeDetails.nodeID, boxId: activeSanboxId});
                        if(existCard.length === 0){
                            cardDetails = cards[0];
                            setCardDetailFromResponse(successCallback, activeSanboxId);
                        }
                    }else{
                        cardDetails = cards[0];
                        setCardDetailFromResponse(successCallback, activeSanboxId);
                    }
                }
                commonUtility.callback(successCallback);
            }, 1000);
        }, handlerLoader.exceptionHandler.logError);   
    }
    
    function getMultipleCards(cardIds, activeSanboxId, successCallback){
        if(commonUtility.isDefinedObject(cardIds)){
            var excludedCards = [];
            for(var index=0; index<cardIds.length; index++){
                if(commonUtility.isDefinedObject(objectStorage.cardList)){
                    if(commonUtility.filterInArray(objectStorage.cardList, 
                        {id: cardIds[index], boxId: activeSanboxId}).length === 0){
                        if(!getCardFromMemory(activeSanboxId, cardIds[index])){
                            excludedCards.push(cardIds[index]);
                        }
                    }
                }
            }
            if(excludedCards.length === 0){
                commonUtility.callback(successCallback);
                return;
            }else{
                for(var index=0; index<excludedCards.length; index++){
                    getCardFromDB(activeSanboxId, successCallback, 
                        excludedCards[index]);
                }
            }
        }
    }
    
    cardBusiness.getCardDetailsListAsync = function(successCallback, activeSanboxId) {
        if (handlerLoader.sessionHandler.get(constantLoader.sessionItems.SEARCH_TYPE) === "id") {
            var length = objectStorage.searchSummary.length;
            objectStorage.searchSummary.splice(0, length);
        }
        var boxes = localStorage.getObject("sandBoxes");
        if(!commonUtility.is3DValidKey(activeSanboxId)){
            activeSanboxId = commonUtility.filterInArray(boxes, {isActive: true})[0].boxId;
        }
        if(isCardCountAcceptable(activeSanboxId)){
            if(objectStorage.SandboxEditId > 0){
                objectStorage.SandboxEditId = 0;
                if(commonUtility.filterInArray(boxes, {boxId: activeSanboxId}).length > 0){
                    var cards = commonUtility.filterInArray(boxes, {boxId: activeSanboxId})[0].cards;
                    getMultipleCards(cards, activeSanboxId, successCallback);
                }
            }else{
                var nodeDetailsId = "";
                if(commonUtility.is3DValidKey(objectStorage.quickViewId)){
                    nodeDetailsId = objectStorage.quickViewId;
                }else{
                    nodeDetailsId = handlerLoader.sessionHandler.get(constantLoader.sessionItems.SEARCH_TEXT);
                }
                
                if(getCardFromMemory(activeSanboxId, nodeDetailsId)){
                    commonUtility.callback(successCallback);
                    return;
                }
                return getCardFromDB(activeSanboxId, successCallback, nodeDetailsId);
            }
        }
    };
    
    cardBusiness.addMultipleCards = function(cardIds, activeSanboxId, successCallback){
        getMultipleCards(cardIds, activeSanboxId, successCallback);
    };
    
    cardBusiness.getCardChildListAsync = function(id){
        return cardData.getCardChildListAsync(id);
    };
    
    return cardBusiness;
  });
