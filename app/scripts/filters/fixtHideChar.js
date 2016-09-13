'use strict';

angular.module('fixtApp')
  .filter('fixtHideChar', function (commonUtility, constantLoader) {
    return function (input, outText) {
        
        if(!commonUtility.is3DValidKey(input)){
            return constantLoader.defaultValues.BLANK_STRING;
        }
        
        return commonUtility.replaceString(input, outText,
            constantLoader.defaultValues.BLANK_STRING);
    };
  });