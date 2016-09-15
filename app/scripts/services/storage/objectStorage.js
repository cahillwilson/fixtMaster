'use strict';

angular.module('fixtApp')
  .service('objectStorage', function () {
    
    var objectStorage = {};
    
    var cardList = [];
    var isSandboxAdded = false;
    var sandboxEditId = 0;
    var searchSummary = [];
    var isMultipleRecords = false;
    
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
    
    Object.defineProperty(objectStorage, "isMultipleRecords", {
        get: function() {
            return isMultipleRecords;
        },
        set: function(manyRecords) {
            isMultipleRecords = manyRecords;
        }
    });
    
    return objectStorage;
});