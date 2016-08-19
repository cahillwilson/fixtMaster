'use strict';

angular.module('fixtApp')
    .factory('constantLoader', function (defaultValues, relativeUrls) {
          
        var constantLoader = {};
  
        constantLoader.defaultValues = defaultValues;
        constantLoader.relativeUrls = relativeUrls;
        
        return constantLoader;
    });