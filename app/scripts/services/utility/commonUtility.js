'use strict';

angular.module('fixtApp')
  .factory('commonUtility', function (constantLoader, serviceLoader) {
    
    var commonUtility = {};
    
    commonUtility.getRelativeUrl = function(relativeUrl){
        return relativeUrl;
    };
    
    commonUtility.is3DValidKey = function(value){
        return (angular.isDefined(value) && 
            value !== constantLoader.defaultValues.BLANK_STRING && value !== null);
    };
    
    commonUtility.isDefinedObject = function(object){
        return (angular.isDefined(object) && object !== null);
    };
    
    commonUtility.redirectTo = function(route){
        serviceLoader.location.path(route);
    };
    
    commonUtility.filterInArray = function(array, filterJson){
        return serviceLoader.filter("filter")(array, filterJson);
    };
    
    return commonUtility;
  });
