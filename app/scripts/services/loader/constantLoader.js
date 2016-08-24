'use strict';

angular.module('fixtApp')
    .factory('constantLoader', function (defaultValues, relativeUrls,
        defaultObjects, routeList) {
          
        var constantLoader = {};
  
        constantLoader.defaultValues = defaultValues;
        constantLoader.relativeUrls = relativeUrls;
        constantLoader.defaultObjects = defaultObjects;
        constantLoader.routeList = routeList;
        
        return constantLoader;
    });