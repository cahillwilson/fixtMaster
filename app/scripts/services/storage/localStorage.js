'use strict';

angular.module('fixtApp')
  .factory('localStorage', function () {
    
    var storage = {};
    
    storage.getObject = function(key) {
        var item = localStorage.getItem(key);
        if(item){
            item = angular.fromJson(item);
            if(item === "null"){
                item = null;
            }
        }
        return item;
    };
    
    storage.setObject = function(key, obj) {
        var item = angular.toJson(obj);
        if(item){
            localStorage.setItem(key, item);
        }
    };
    
    storage.removeObject = function(key) {
        localStorage.removeItem(key);
    };
    
    storage.clearObjects = function() {
        localStorage.clear();
    };
    
    Object.seal(storage);
    return storage;
  });
