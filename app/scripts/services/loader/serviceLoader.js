'use strict';

angular.module('fixtApp')
    .service('serviceLoader', function ($http, $log, $location, $rootScope) {
        
        var serviceLoader = {};
        
        var _http = null;
        var _log = null;
        var _location = null;
        var _rootScope = null;
        
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
        
        Object.defineProperty(serviceLoader, "location", {
            get: function() {
                return setProperty(_location, $location);
            }
        });
        
        Object.defineProperty(serviceLoader, "rootScope", {
            get: function() {
                return setProperty(_rootScope, $rootScope);
            }
        });
        
        return serviceLoader;
    });
