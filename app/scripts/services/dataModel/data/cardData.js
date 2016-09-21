'use strict';

angular.module('fixtApp')
  .factory('cardData', function (dataAccess, constantLoader, handlerLoader) {
    
    var cardData = {};
    
    cardData.getCardDetailsListAsync = function() {
        return dataAccess.getFromJsonAsync(constantLoader.relativeUrls.CARD_DETAILS);
    };
    
    cardData.getCardChildListAsync = function(id) {
        return dataAccess.getFromJsonAsync(constantLoader.relativeUrls.CARD_CHILD);
    };
    
    cardData.getInitialSearchResultAsync = function() {
        var httpPromise = dataAccess.getFromJsonAsync(constantLoader.relativeUrls.SEARCH_SUMMARY);;
        handlerLoader.sessionHandler.set(constantLoader.sessionItems.SEARCH_SUMMARY_PROMISE, httpPromise, false);
        return httpPromise;
    };
    
    return cardData;
  });
