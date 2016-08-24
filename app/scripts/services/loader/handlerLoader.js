'use strict';

angular.module('fixtApp')
    .service('handlerLoader', function (log, base64Handler, sessionHandler,
        exceptionHandler) {
        
        var handlerLoader = {};
        
        handlerLoader.log = log;
        handlerLoader.base64Handler = base64Handler;
        handlerLoader.sessionHandler = sessionHandler;
        handlerLoader.exceptionHandler = exceptionHandler;
        
        return handlerLoader;
    });
