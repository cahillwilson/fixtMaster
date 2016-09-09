'use strict';

angular.module('fixtApp')
  .factory('cardData', function (dataAccess, constantLoader) {
    
    var cardData = {};
    
    cardData.getCardDetailsListAsync = function() {
        return dataAccess.getFromJsonAsync(constantLoader.relativeUrls.CARD_DETAILS);
    };
    
    cardData.getCardChildListAsync = function(id) {
        return dataAccess.getFromJsonAsync(constantLoader.relativeUrls.CARD_CHILD);
    };
    
    return cardData;
  });
