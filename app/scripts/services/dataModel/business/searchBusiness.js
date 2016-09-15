'use strict';

angular.module('fixtApp')
  .factory('searchBusiness', function (cardData, handlerLoader, objectStorage, 
      commonUtility, cardBusiness) {
    
    var searchBusiness = {};
    var nodeDetails = [];
    
    
    function setSearchSummaryFromResponse(successCallback, activeSanboxId) {
        objectStorage.isMultipleRecords = false;
        if (commonUtility.isDefinedObject(nodeDetails) && nodeDetails.length > 0) {
            if (nodeDetails.length === 1) {
                cardBusiness.getCardDetailsListAsync(successCallback, activeSanboxId);
                objectStorage.searchSummary.push(nodeDetails[0]);
            } else {
                objectStorage.isMultipleRecords = true;
                angular.forEach(nodeDetails, function (value) {
                    var detail = {};
                    detail.showQuickView = false;
                    detail.nodeDetail = value;
                    objectStorage.searchSummary.push(detail);
                });
            }
        }
    }
    
    searchBusiness.getSearchSummaryAsync = function(successCallback, activeSanboxId) {
        return cardData.getInitialSearchResultAsync().then(function (response) {
            nodeDetails = response.data.nodeDetails;
            
            setSearchSummaryFromResponse(successCallback, activeSanboxId);
            commonUtility.callback(successCallback);
        }, handlerLoader.exceptionHandler.logError);
    };
    
    return searchBusiness;
  });
