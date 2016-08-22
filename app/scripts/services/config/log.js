'use strict';

angular.module('fixtApp')
  .factory('log', function (serviceLoader) {
    
    var log = {};
    
    log.info = function(message) {
        serviceLoader.log.info(message);
    };
    
    log.warn = function(message) {
        serviceLoader.log.warn(message);
    };
    
    log.error = function(exception) {
        serviceLoader.log.error(exception);
    };
    
    return log;
  });
