'use strict';

angular.module('fixtApp')
  .factory('base64', function (constantLoader) {
    
    var base64 = {};
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    
    base64.encode = function(e){
        var t = constantLoader.defaultValues.BLANK_STRING;
        var n,r,i,s,o,u,a;
        var f=0;e=utf8_encode(e);
        while(f<e.length){
            n=e.charCodeAt(f++);
            r=e.charCodeAt(f++);
            i=e.charCodeAt(f++);
            s=n>>2;
            o=(n&3)<<4|r>>4;
            u=(r&15)<<2|i>>6;
            a=i&63;
            if(isNaN(r)){
                u = a = 64;
            }else if(isNaN(i)){
                a=64;
            }
            t=t+keyStr.charAt(s)+keyStr.charAt(o)+keyStr.charAt(u)+keyStr.charAt(a);
        }
        return t;
    };
    
    base64.decode = function(e){
        var t = constantLoader.defaultValues.BLANK_STRING;
        var n,r,i;
        var s,o,u,a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, constantLoader.defaultValues.BLANK_STRING);
        while(f<e.length){
            s=keyStr.indexOf(e.charAt(f++));
            o=keyStr.indexOf(e.charAt(f++));
            u=keyStr.indexOf(e.charAt(f++));
            a=keyStr.indexOf(e.charAt(f++));
            n=s<<2|o>>4;
            r=(o&15)<<4|u>>2;
            i=(u&3)<<6|a;
            t=t+String.fromCharCode(n);
            if(u!==64){
                t=t+String.fromCharCode(r);
            }
            if(a!==64){
                t=t+String.fromCharCode(i);
            }
        }
        t=utf8_decode(t);
        return t;
    };
    
    function utf8_encode(e){
        e=e.replace(/rn/g,"n");
        var t=constantLoader.defaultValues.BLANK_STRING;
        for(var n=0;n<e.length;n++){
            var r=e.charCodeAt(n);
            if(r<128){
                t+=String.fromCharCode(r);
            }else if(r>127&&r<2048){
                t+=String.fromCharCode(r>>6|192);
                t+=String.fromCharCode(r&63|128);
            }else{
                t+=String.fromCharCode(r>>12|224);
                t+=String.fromCharCode(r>>6&63|128);
                t+=String.fromCharCode(r&63|128);
            }
        }
        return t;
    }
    
    function utf8_decode(e){
        var t=constantLoader.defaultValues.BLANK_STRING;
        var n=0;
        var c2 = 0;
        var c3 = 0;
        var r=0;
        while(n<e.length){
            r=e.charCodeAt(n);
            if(r<128){
                t+=String.fromCharCode(r);
                n++;
            }else if(r>191&&r<224){
                c2=e.charCodeAt(n+1);
                t+=String.fromCharCode((r&31)<<6|c2&63);
                n+=2;
            }else{
                c2=e.charCodeAt(n+1);
                c3=e.charCodeAt(n+2);
                t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);
                n+=3;
            }
        }
        return t;
    }
    
    return base64;
  });
