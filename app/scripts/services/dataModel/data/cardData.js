'use strict';

angular.module('fixtApp')
  .factory('cardData', function (dataAccess, constantLoader, commonUtility) {
    
    var cardData = {};
    
    cardData.getCardDetailsListAsync = function() {
        return dataAccess.getAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.URL));
    };
    
    return cardData;
  });
