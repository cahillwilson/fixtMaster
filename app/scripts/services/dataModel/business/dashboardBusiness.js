'use strict';

angular.module('fixtApp')
  .factory('dashboardBusiness', function (dashboardData) {
    
    var dashboardBusiness = {};
    
    dashboardBusiness.getSearchTypesAsync = function() {
        
        return dashboardData.getSearchTypesAsync();
    };
    
    return dashboardBusiness;
  });
