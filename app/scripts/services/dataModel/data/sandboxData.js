'use strict';

angular.module('fixtApp')
  .factory('sandboxData', function (dataAccess, commonUtility, constantLoader) {
    
    var sandboxData = {};
    
    sandboxData.getAllSandboxAsync = function() {
        return dataAccess.getAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.GET_SANDBOXES));
    };
    
    return sandboxData;
  });
