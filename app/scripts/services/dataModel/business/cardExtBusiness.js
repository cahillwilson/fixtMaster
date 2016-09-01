'use strict';

angular.module('fixtApp')
  .factory('cardExtBusiness', function (cardData) {
    
    var cardExtBusiness = {};
    
    cardExtBusiness.getCardDetailsListAsync = function() {
        return cardExtended.getCardDetailsListAsync();
    };
    
    return cardExtBusiness;
  });
