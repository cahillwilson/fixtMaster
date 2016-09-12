'use strict';

angular.module('fixtApp')
  .service('objectStorage', function () {
    
    var objectStorage = {};
    
    var cardList = [];
    var isSandboxAdded = false;
    var sandboxEditId = 0;
    
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
    
    Object.defineProperty(objectStorage, "SandboxEditId", {
        get: function() {
            return sandboxEditId;
        },
        set: function(id) {
            sandboxEditId = id;
        }
    });
    
    return objectStorage;
});