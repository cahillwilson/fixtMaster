'use strict';

angular.module('fixtApp')
  .factory('searchBusiness', function (cardData, handlerLoader, objectStorage, 
      commonUtility, cardBusiness, constantLoader, serviceLoader) {
    
    var searchBusiness = {};
    var nodeDetails = [];
    
    
    function setSearchSummaryFromResponse(successCallback, activeSanboxId) {
        objectStorage.hasMultipleRecords = false;
        if(commonUtility.isDefinedObject(nodeDetails) && nodeDetails.length === 1) {
            cardBusiness.getCardDetailsListAsync(successCallback, activeSanboxId, nodeDetails[0].nodeID, nodeDetails[0].nodeType);
        }
//        if (handlerLoader.sessionHandler.get(constantLoader.sessionItems.SEARCH_TYPE) === "id") {
//            cardBusiness.getCardDetailsListAsync(successCallback, activeSanboxId);
//        } else {
//            angular.forEach(nodeDetails, function (value) {
//                var detail = {};
//                detail.showQuickView = false;
//                detail.nodeDetail = value;
//                objectStorage.searchSummary.push(detail);
//            });
//            objectStorage.hasMultipleRecords = true;
//        }
        commonUtility.callback(successCallback);
    }
    
    searchBusiness.getSearchSummaryAsync = function(relativeUrl, searchString, successCallback, activeSanboxId) {
        objectStorage.searchSummary = [];
        return cardData.getInitialSearchResultAsync(relativeUrl, searchString).then(function (response) {
            return serviceLoader.timeout(function() {
                nodeDetails = response.data.nodeDetails;
                setSearchSummaryFromResponse(successCallback, activeSanboxId);
                commonUtility.callback(successCallback);
            }, 1000);
        }, handlerLoader.exceptionHandler.logError);
    };
    
    return searchBusiness;
  });
