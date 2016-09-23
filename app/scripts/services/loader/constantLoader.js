'use strict';

angular.module('fixtApp')
    .factory('constantLoader', function (defaultValues, relativeUrls, nodeTypes,
        defaultObjects, routeList, messages, validationPatterns, sessionItems,
        eventList) {
          
        var constantLoader = {};
  
        constantLoader.defaultValues = defaultValues;
        constantLoader.relativeUrls = relativeUrls;
        constantLoader.nodeTypes = nodeTypes;
        constantLoader.defaultObjects = defaultObjects;
        constantLoader.routeList = routeList;
        constantLoader.messages = messages;
        constantLoader.validationPatterns = validationPatterns;
        constantLoader.sessionItems = sessionItems;
        constantLoader.eventList = eventList;
        
        return constantLoader;
    });