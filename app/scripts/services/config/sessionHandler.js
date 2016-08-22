'use strict';

angular.module('fixtApp')
  .factory('sessionHandler', function (serviceLoader, base64, commonUtility) {
    
    var sessionHandler = {};
    
    sessionHandler.set = function(propertyName, value, isEncripted){
        if(!commonUtility.is3DValidKey(isEncripted)){
            isEncripted = true;
        }
        value = isEncripted ? base64.encode(value) : value;
        serviceLoader.rootScope[propertyName] = value;
    };
    
    sessionHandler.get = function(propertyName, isEncripted){
        if(!commonUtility.is3DValidKey(isEncripted)){
            isEncripted = true;
        }
        if(isEncripted){
            return base64.decode(serviceLoader.rootScope[propertyName]);
        }
        return serviceLoader.rootScope[propertyName];
    };
    
    sessionHandler.delete = function(propertyName){
        delete serviceLoader.rootScope[propertyName];
    };
    
    sessionHandler.clear = function(){
        for(var prop in serviceLoader.rootScope){
            sessionHandler.delete(prop);
        }
    };
    
    return sessionHandler;
  });
