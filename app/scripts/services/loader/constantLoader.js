'use strict';

angular.module('fixtApp')
    .factory('constantLoader', function (defaultValues, relativeUrls,
        defaultObjects) {
          
        var constantLoader = {};
  
        constantLoader.defaultValues = defaultValues;
        constantLoader.relativeUrls = relativeUrls;
        constantLoader.defaultObjects = defaultObjects;
        
        return constantLoader;
    });