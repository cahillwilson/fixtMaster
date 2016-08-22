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
    
    commonUtility.redirectTo = function(route){
        serviceLoader.location.path(route);
    };
    
    return commonUtility;
  });
