'use strict';

angular.module('fixtApp')
  .filter('fixtRootScope', function (commonUtility, constantLoader) {
    return function (input) {
        
        if (!commonUtility.is3DValidKey(input)){
            return constantLoader.defaultValues.BLANK_STRING; 
        }
        return constantLoader.sessionItems[input];
    };
  });