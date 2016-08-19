'use strict';

angular.module('fixtApp')
  .factory('commonUtility', function () {
    
    var commonUtility = {};
    
    commonUtility.getRelativeUrl = function(relativeUrl){
        return relativeUrl;
    };
    
    return commonUtility;
  });
