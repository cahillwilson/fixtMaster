'use strict';

angular.module('fixtApp')
  .factory('cardBusiness', function (cardData) {
    
    var cardBusiness = {};
    
    cardBusiness.getCardDetailsListAsync = function() {
        return cardData.getCardDetailsListAsync();
    };
    
    return cardBusiness;
  });
