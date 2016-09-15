'use strict';

angular.module('fixtApp')
  .service('dataAccess', function (serviceLoader, constantLoader) {
    
    this.getAsync = function(relativeUrl){
        return serviceLoader.http({
            method: 'GET', 
            url: buildUrl(relativeUrl),
            headers: generateHeader()
        });
    };
    
    this.getFromJsonAsync = function(relativeUrl){
        return serviceLoader.http({
            method: 'GET', 
            url: relativeUrl
        });
    };
    
    this.postAsync = function(relativeUrl, postData){
        var httpPromise = null;
        var requestObj = {};
        requestObj = {
            method: 'POST', 
            url: buildUrl(relativeUrl),
            data: postData,
            headers: generateHeader()
        };
        httpPromise = serviceLoader.http(requestObj);
        return httpPromise;
    };
    
    this.putAsync = function(relativeUrl, putData){
        var httpPromise = null;
        var requestObj = {};
        requestObj = {
                        method: 'PUT', 
                        url: buildUrl(relativeUrl),
                        data: putData,
                        headers: generateHeader()
                    };
        httpPromise = serviceLoader.http(requestObj);
        return httpPromise;
    };
    
    this.deleteAsync = function(relativeUrl){
        return serviceLoader.http.delete(buildUrl(relativeUrl), generateHeader());
    };
    
    function buildUrl(relativeUrl){
        return constantLoader.defaultValues.BASE_URL + relativeUrl;
    }
    
    function generateHeader() {
        var header = {};
        header = {
            
            "userid": "123456"
//            "Access-Control-Allow-Origin": "*"
//            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
//            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE"
            
        };
        return header;
    }
});
