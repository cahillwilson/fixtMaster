'use strict';

angular.module('fixtApp')
  .filter('fixtRootScope', function (commonUtility, constantLoader, handlerLoader) {
    return function (input, isValueReq) {
        
        if (!commonUtility.is3DValidKey(input)){
            return constantLoader.defaultValues.BLANK_STRING; 
        }
        if(isValueReq){
            return handlerLoader.sessionHandler.get(constantLoader.sessionItems[input], false);
        }
        return constantLoader.sessionItems[input];
    };
  });