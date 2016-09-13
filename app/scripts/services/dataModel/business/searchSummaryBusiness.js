'use strict';

angular.module('fixtApp')
  .factory('searchSummaryBusiness', function (cardData, handlerLoader, objectStorage, 
      commonUtility) {
    
    var searchSummaryBusiness = {};
    
    
    searchSummaryBusiness.getSearchSummaryAsync = function(successCallback, activeSanboxId) {
        return cardData.getInitialSearchResultAsync().then(function (response) {
            objectStorage.searchSummary = response.data.nodeDetails;
            commonUtility.callback(successCallback);
        }, handlerLoader.exceptionHandler.logError);
    };
    
    return searchSummaryBusiness;
  });
