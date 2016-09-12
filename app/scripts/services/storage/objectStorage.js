'use strict';

angular.module('fixtApp')
  .service('objectStorage', function () {
    
    var objectStorage = {};
    
    var cardList = [];
    var isSandboxAdded = false;
    
    Object.defineProperty(objectStorage, "cardList", {
        get: function() {
            return cardList;
        },
        set: function(cards) {
            cardList = cards;
        }
    });
    
    Object.defineProperty(objectStorage, "isSandboxAdded", {
        get: function() {
            return isSandboxAdded;
        },
        set: function(isAdded) {
            isSandboxAdded = isAdded;
        }
    });
    
    return objectStorage;
});