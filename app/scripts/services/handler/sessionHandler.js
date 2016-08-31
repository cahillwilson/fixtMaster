'use strict';

angular.module('fixtApp')
  .factory('sessionHandler', function (serviceLoader, base64Handler) {
    
    var sessionHandler = {};
    
    sessionHandler.set = function(propertyName, value, isEncripted){
        if(angular.isUndefined(isEncripted)){
            isEncripted = true;
        }
        value = isEncripted ? base64Handler.encode(value) : value;
        serviceLoader.rootScope[propertyName] = value;
    };
    
    sessionHandler.get = function(propertyName, isEncripted){
        if(angular.isUndefined(isEncripted)){
            isEncripted = true;
        }
        if(isEncripted){
            return base64Handler.decode(serviceLoader.rootScope[propertyName]);
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
