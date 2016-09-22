'use strict';

angular.module('fixtApp')
  .service('objectStorage', function (constantLoader) {
    
    var objectStorage = {};
    
    var cardList = [];
    var isSandboxAdded = false;
    var hasMultipleRecords = false;
    var sandboxEditId = 0;
    var searchSummary = [];
    var quickViewCard = {};
    var quickViewId = constantLoader.defaultValues.BLANK_STRING;
    
    Object.defineProperty(objectStorage, "hasMultipleRecords", {
        get: function() {
            return hasMultipleRecords;
        },
        set: function(multRecords) {
            hasMultipleRecords = multRecords;
        }
    });
    
    
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
    
    Object.defineProperty(objectStorage, "searchSummary", {
        get: function() {
            return searchSummary;
        },
        set: function(searchResult) {
            searchSummary = searchResult;
        }
    });
    
    Object.defineProperty(objectStorage, "quickViewId", {
        get: function() {
            return quickViewId;
        },
        set: function(id) {
            quickViewId = id;
        }
    });
    
    Object.defineProperty(objectStorage, "quickViewCard", {
        get: function() {
            return quickViewCard;
        },
        set: function(quickView) {
            quickViewCard = quickView;
        }
    });
    
    return objectStorage;
});