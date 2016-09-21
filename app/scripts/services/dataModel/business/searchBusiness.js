'use strict';

angular.module('fixtApp')
  .factory('searchBusiness', function (cardData, handlerLoader, objectStorage, 
      commonUtility, cardBusiness, constantLoader, serviceLoader) {
    
    var searchBusiness = {};
    var nodeDetails = [];
    
    
    function setSearchSummaryFromResponse(successCallback, activeSanboxId) {
        objectStorage.hasMultipleRecords = false;
        if (handlerLoader.sessionHandler.get(constantLoader.sessionItems.SEARCH_TYPE) === "id") {
            cardBusiness.getCardDetailsListAsync(successCallback, activeSanboxId);
        } else {
            angular.forEach(nodeDetails, function (value) {
                var detail = {};
                detail.showQuickView = false;
                detail.nodeDetail = value;
                objectStorage.searchSummary.push(detail);
            });
            objectStorage.hasMultipleRecords = true;
        }
        commonUtility.callback(successCallback);
    }
    
    searchBusiness.getSearchSummaryAsync = function(successCallback, activeSanboxId) {
        if (commonUtility.isDefinedObject(objectStorage.searchSummary) && objectStorage.searchSummary.length > 0) {
            angular.forEach(objectStorage.searchSummary, function (value) {
                value.showQuickView = false;
            });
        } else {
            return cardData.getInitialSearchResultAsync().then(function (response) {
                return serviceLoader.timeout(function() {
                nodeDetails = response.data.nodeDetails;

                setSearchSummaryFromResponse(successCallback, activeSanboxId);
                commonUtility.callback(successCallback);
                }, 1000);
            }, handlerLoader.exceptionHandler.logError);
        }
    };
    
    return searchBusiness;
  });
