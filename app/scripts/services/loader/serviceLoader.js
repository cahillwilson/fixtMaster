'use strict';

angular.module('fixtApp')
    .service('serviceLoader', function ($http, $log) {
        
        var serviceLoader = {};
        
        var _http = null;
        var _log = null;
        
        function setProperty(instance, service){
            if(instance === null){
                instance = service;
                return instance;
            }
            return instance;
        }
        
        Object.defineProperty(serviceLoader, "http", {
            get: function() {
                return setProperty(_http, $http);
            }
        });
        
        Object.defineProperty(serviceLoader, "log", {
            get: function() {
                return setProperty(_log, $log);
            }
        });
        
        return serviceLoader;
    });
