'use strict';

angular.module('fixtApp')
  .factory('exceptionHandler', function (log) {
    
    var errorHandler = {};
    
    function logError(response){
        log.info("--##### Error Description - start #####--");
        log.info("Status: " + response.status);
        log.info("Body: " + response.data);
        log.info(response.config);
        log.info("--##### Error Description - end #####--");
    }
    
    errorHandler.onErrorLog = function(response) {
        logError(response);
    };
    
    errorHandler.onErrorLogWithAlert = function(response, alertMessage) {
        logError(response);
    };
    
    return errorHandler;
  });
