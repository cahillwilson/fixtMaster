'use strict';

angular.module('fixtApp')
    .controller('loginController', function (constantLoader, commonUtility,
        handlerLoader) {

    var vm =  this;
    vm.userName = constantLoader.defaultValues.BLANK_STRING;
    vm.password = constantLoader.defaultValues.BLANK_STRING;
    
    function initialized() {
        
    }
    
    vm.onLoginClick = function(){
        if(commonUtility.is3DValidKey(vm.userName)){
            handlerLoader.sessionHandler.set(constantLoader.sessionItems.USER_NAME,
                vm.userName, false);
            
            commonUtility.redirectTo("/");
        }
    };
    
    initialized();
         
  });
