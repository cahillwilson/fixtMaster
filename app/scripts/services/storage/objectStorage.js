'use strict';

angular.module('fixtApp')
  .service('objectStorage', function () {
      
    var cardList = {};
    
    Object.defineProperty(cardList, "cardList", {
        get: function() {
            return cardList;
        },
        set: function(cards) {
            cardList = cards;
        }
    });
});