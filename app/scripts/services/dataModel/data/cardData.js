'use strict';

angular.module('fixtApp')
  .factory('cardData', function (dataAccess, constantLoader) {
    
    var cardData = {};
    
    cardData.getCardDetailsListAsync = function() {
        return dataAccess.getFromJsonAsync(constantLoader.relativeUrls.CARD_DETAILS);
    };
    
    return cardData;
  });
