'use strict';

angular.module('fixtApp')
  .factory('cardData', function (dataAccess, constantLoader, handlerLoader) {
    
    var cardData = {};
    
    cardData.getCardDetailsListAsync = function(relativeUrl) {
        return dataAccess.getAsync(relativeUrl);//dataAccess.getFromJsonAsync(constantLoader.relativeUrls.CARD_DETAILS);
    };
    
    cardData.getCardChildListAsync = function(id) {
        return dataAccess.getFromJsonAsync(constantLoader.relativeUrls.CARD_CHILD);
    };
    
    cardData.getInitialSearchResultAsync = function(relativeUrl, searchString) {
        var path = relativeUrl + "/" + searchString + "?start = 1&end=25";
        var httpPromise = dataAccess.getAsync(path);//dataAccess.getFromJsonAsync(constantLoader.relativeUrls.SEARCH_SUMMARY);;
        handlerLoader.sessionHandler.set(constantLoader.sessionItems.SEARCH_SUMMARY_PROMISE, httpPromise, false);
        return httpPromise;
    };
    
    return cardData;
  });
