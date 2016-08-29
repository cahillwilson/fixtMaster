'use strict';

angular.module('fixtApp')
    .factory('constantLoader', function (defaultValues, relativeUrls,
        defaultObjects, routeList, messages, validationPatterns) {
          
        var constantLoader = {};
  
        constantLoader.defaultValues = defaultValues;
        constantLoader.relativeUrls = relativeUrls;
        constantLoader.defaultObjects = defaultObjects;
        constantLoader.routeList = routeList;
        constantLoader.messages = messages;
        constantLoader.validationPatterns = validationPatterns;
        
        return constantLoader;
    });