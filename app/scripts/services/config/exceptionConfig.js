'use strict';

angular.module('fixtApp')
    .config(function ($provide) {
        $provide.decorator('$exceptionHandler', function ($injector) {
            return function(exception, cause) {
                // Log the error message
                var log = $injector.get("log");
                log.error(exception);
            };
        });
    });
