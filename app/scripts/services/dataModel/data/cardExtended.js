'use strict';

angular.module('fixtApp')
  .factory('cardExtended', function (dataAccess, constantLoader) {
    
    var cardExtended = {};
    
    cardExtended.getCardDetailsListAsync = function() {
       return dataAccess.getFromJsonAsync(constantLoader.relativeUrls.CARD_EXTENDED);
    };
    
    return cardExtended;
  });



























