'use strict';

angular.module('fixtApp')
    .service('serviceLoader', function ($http) {
        
        var serviceLoader = {};
        
        var _http = null;
        
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
        
        return serviceLoader;
    });
