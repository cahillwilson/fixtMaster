'use strict';

angular.module('fixtApp')
  .factory('dashboardData', function (dataAccess, constantLoader, commonUtility) {
    
    var dashboardData = {};
    
    dashboardData.getSearchTypesAsync = function() {
        return dataAccess.getAsync(commonUtility.getRelativeUrl(
            constantLoader.relativeUrls.URL));
    };
    
    return dashboardData;
  });
