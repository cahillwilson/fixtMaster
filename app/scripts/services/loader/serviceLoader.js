'use strict';

angular.module('fixtApp')
    .service('serviceLoader', function ($filter, $http, $log, $location, 
        $rootScope, $interval) {
        
        var serviceLoader = {};
        
        var _filter = null;
        var _http = null;
        var _log = null;
        var _location = null;
        var _rootScope = null;
        var _interval = null;
        
        function setProperty(instance, service){
            if(instance === null){
                instance = service;
                return instance;
            }
            return instance;
        }
        
        Object.defineProperty(serviceLoader, "filter", {
            get: function() {
                return setProperty(_filter, $filter);
            }
        });
        
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
        
        Object.defineProperty(serviceLoader, "interval", {
            get: function() {
                return setProperty(_interval, $interval);
            }
        });
        
        return serviceLoader;
    });
