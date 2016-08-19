'use strict';

angular.module('fixtApp')
  .factory('sessionStorage', function () {
    
    var storage = {};
    
    storage.getObject = function(key) {
        var item = sessionStorage.getItem(key);
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
            sessionStorage.setItem(key, item);
        }
    };
    
    storage.removeObject = function(key) {
        sessionStorage.removeItem(key);
    };
    
    storage.clearObjects = function() {
        sessionStorage.clear();
    };
    
    Object.seal(storage);
    return storage;
  });
