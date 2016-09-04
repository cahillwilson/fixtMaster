'use strict';

angular.module('fixtApp')
  .service('objectStorage', function () {
    
    var objectStorage = {};
    
    var cardList = [];
    
    Object.defineProperty(objectStorage, "cardList", {
        get: function() {
            return cardList;
        },
        set: function(cards) {
            cardList = cards;
        }
    });
    
    return objectStorage;
});